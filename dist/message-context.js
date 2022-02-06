"use strict";var __importDefault=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});const string_utils_1=__importDefault(require("@bizhermit/basic-utils/dist/string-utils"));class MessageContext{messages;constructor(){this.messages=[]}getMessages(){return this.messages}clearMessages(){return this.messages=[],this}addMessage(e){return null==e||string_utils_1.default.isEmpty(e.message)||this.messages.push({type:e.type,title:e.title??"",message:e.message}),this}addInformation(e,s=""){return this.addMessage({type:"info",message:e,title:s})}addWarning(e,s=""){return this.addMessage({type:"warn",message:e,title:s})}addError(e,s=""){return this.addMessage({type:"err",message:e,title:s})}hasMessage(e){return string_utils_1.default.isEmpty(e)?this.messages.length>0:this.messages.some((s=>s.type===e))}hasInformation(){return this.hasMessage("info")}hasWarning(){return this.hasMessage("warn")}hasError(){return this.hasMessage("err")}getMessageCount(e){return string_utils_1.default.isEmpty(e)?this.messages.length:this.messages.filter((s=>s.type===e)).length}getInformationCount(){return this.getMessageCount("info")}getWarningCount(){return this.getMessageCount("warn")}getErrorCount(){return this.getMessageCount("err")}}exports.default=MessageContext;