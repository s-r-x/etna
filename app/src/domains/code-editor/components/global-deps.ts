import "codemirror/mode/javascript/javascript";
import "codemirror/mode/xml/xml";
import "codemirror/addon/lint/lint";
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
// @ts-ignore
import jsonlint from "jsonlint-mod";
import "codemirror-graphql/hint";
import "codemirror-graphql/lint";
import "codemirror-graphql/mode";
// @ts-ignore
require("jshint/dist/jshint");
// @ts-ignore
window.jsonlint = jsonlint;
