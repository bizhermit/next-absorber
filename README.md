# Next absorber

Webアプリケーション：[@bizhermit/nexpress](https://www.npmjs.com/package/@bizhermit/nexpress)とデスクトップアプリケーション：[@bizhermit/nextron](https://www.npmjs.com/package/@bizhermit/nextron)におけるNext.jsの差異を吸収します。

---

## 使用方法

### APIコール

ApiContextとfetchApiを使用することで、Webアプリケーションとデスクトップアプリケーションのどちらも同じ書き方でsrc/apiへアクセスすることができます。

#### api側
```ts
// src/pages/api/hello.ts

import ApiContext from "@bizhermit/next-absorber/dist/api-context";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
    const ctx = new ApiContext(req, res);
    try {
        const params = ctx.getParams(); // get body params
        console.log(params); // => { action: "test" }

        let count = ctx.getSession<number>("count") ?? 0;
        count++;
        ctx.setSession("count", count);
        
        ctx.addInformation("success!");
        ctx.done({ count }); // return code:200
    } catch(err) {
        ctx.error(err); // return code:500
    }
};
export default handler;
```

#### フロントエンド側

```tsx
// src/pages/index.tsx

import { fetchApi } from "@bizhermit/next-absorber/dist/fetch";

const Component = () => {

    const func = async () => {
        const res = await fetchApi("hello", { action: "test" }); // urlはapi以降のパス
        const messages = res.messages;
        console.log(messages); // => [{ title: "", message: "success!", type: "info" }]
        if (res.hasError) {
            // error action
            return;
        }
        const data = res.data;
        console.log(data); // => { count: 1 }
    };

    return <button onClick={func}>fetch api</button>;
};
```

---

## 説明

### fetch

#### 型
```ts
// オプション
type FetchOptions = {
    method?: "POST" | "GET" | "PUT" | "DELETE" | "INSERT"; // default: POST
    headers?: {
        [key: string]: string;
    };
};
// 戻り値
type FetchApiResponse<T = {[key: string]: any;}> = {
    data: T;
    messages: Array<MessageProps>;
    hasInformation: boolean;
    hasWarning: boolean;
    hasError: boolean;
};
```

#### fetchApi
非同期でapiコールを行います。  
- url: api以降のパス。
- params: ボディパラメータ
- options: FetchOptions

戻り値はFetchApiResponseに変換されます。

```ts
<T = {}>(url: string, params?: {[key: string]: any;}, options?: FetchOptions)
 => Promise<FetchApiResponse<T>>;
```

#### fetchApiSync
fetchApiの同期関数です。
```ts
 <T = {}>(url: string, params: {[key: string]: any;}, options: FetchOptions, callback: (res: FetchApiResponse<T>) => void) => void;
```


#### fetchData
api側でApiContextを使用していない場合や、戻り値をFetchApiResponseに変換したくない場合はこちらを使用できます。

```ts
<T = {}>(url: string, params?: {[key: string]: any;} | undefined, options?: FetchOptions)
 => Promise<T>;
```

#### fetchDataSync
fetchDataの同期関数です。
```ts
<T = {}}>(url: string, params: {[key: string]: any;}, options: FetchOptions, callback?: ((res: T) => void) | undefined) => void;
```


---

### ApiContext

後述するMessageContextを継承しています。

#### getRequest<T = {[key: string]: any;}>(): T
requestオブジェクト（NextAPiRequest）を返します。

#### getResponse<T = {[key: string]: any;}>(): T
responseオブジェクト（NextApiResponse）を返します。

#### getMethod(): string
メソッド（POST/GET等）を返します。

#### getParams<T = {[key: string]: any;}>(): T
ボディパラメータを返します。

#### getQuery(key: string): string | string[]
クエリパラメータを返します。

#### getCookie(key: string): string
クッキーを返します。

#### getSessionID(): string
セッションIDを返します。

#### getSession<T>(key: string): T | null
セッションの値を返します。

#### setSession(key: string, value: any): this
セッションに値を設定します。

#### clearSession(key?: string): this
セッションの値を削除します。kyeが未指定の場合は、全て削除されます。

#### regenerateSession(keepParams?: boolean): Promise<this>
新しいセッションIDを作成し、セッションを再構築します。  
keepParamsにtrueが設定された場合、セッションの値が保持されます。

#### done(data?: {[key: string]: any;}, message?: string, title?: string): void
レスポンスをステータスコード200で返却します。

#### doneAs(code?: number, data?: {[key: string]: any;}, message?: string, title?: string): void;
任意のステータスコードが設定できるdoneメソッドになります。  
コード未設定時は200が設定されます。

#### error(err?: any): void
レスポンスをステータスコード500で返却します。

---

### MessageContext

#### 型
```ts
type MessageType = "info" | "warn" | "err";
type MessageProps = {
    type: MessageType;
    title: string;
    message: string;
};
```

#### getMessages(): MessageProps[]
メッセージの配列を返します。

#### clearMessages(): this
メッセージをすべて削除します。

#### addMessage(props: MessageProps): this
メッセージを追加します。

#### addInformation(message: string, title?: string): this
通常メッセージを追加します。

#### addWarning(message: string, title?: string): this
注意メッセージを追加します。

#### addError(message: string, title?: string): this
警告メッセージを追加します。

#### hasMessage(type?: MessageType): boolean
指定されたメッセージタイプのメッセージが存在するかどうかを返します。  
未指定の場合は、いずれかのメッセージが存在するかどうかを返します。

#### hasInformation(): boolean
通常メッセージが存在するかどうかを返します。

#### hasWarning(): boolean
注意メッセージが存在するかどうかを返します。

#### hasError(): boolean
警告メッセージが存在するかどうかを返します。

#### getMessageCount(type?: MessageType): number
指定されたメッセージの件数を返します。  
未指定の場合は、全てのメッセージの件数を返します。

#### getInformationCount(): number
通常メッセージの件数を返します。

#### getWarningCount(): number
注意メッセージの件数を返します。

#### getErrorCount(): number
警告メッセージの件数を返します。