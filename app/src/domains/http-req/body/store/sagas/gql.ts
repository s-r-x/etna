import { HttpClient } from "@/utils/HttpClient";
import { SagaIterator } from "redux-saga";
import {
  put,
  select,
  take,
  fork,
  race,
  cancel,
  cancelled,
  call,
} from "typed-redux-saga";
import { HttpReqBodyActions as Actions } from "../slice";
import { message } from "antd";
import { HttpRequestSelectors } from "@/domains/http-req/root/store/selectors";

function* gqlSchemaSaga(): SagaIterator {
  const client = new HttpClient();
  try {
    yield* put(Actions.loadGqlSchemaStart());
    const url = yield* select(HttpRequestSelectors.getUrl);
    const headers = yield* select(HttpRequestSelectors.getRequestReadyHeaders);
    const auth = yield* select(HttpRequestSelectors.getAuth);
    const res = yield* call(client.make, url, "POST", {
      headers: {
        ...headers,
        "content-type": "application/json",
      },
      auth,
      body: {
        operationName: "IntrospectionQuery",
        variables: {},
        query:
          "query IntrospectionQuery {\n  __schema {\n    queryType {\n      name\n    }\n    mutationType {\n      name\n    }\n    subscriptionType {\n      name\n    }\n    types {\n      ...FullType\n    }\n    directives {\n      name\n      description\n      locations\n      args {\n        ...InputValue\n      }\n    }\n  }\n}\n\nfragment FullType on __Type {\n  kind\n  name\n  description\n  fields(includeDeprecated: true) {\n    name\n    description\n    args {\n      ...InputValue\n    }\n    type {\n      ...TypeRef\n    }\n    isDeprecated\n    deprecationReason\n  }\n  inputFields {\n    ...InputValue\n  }\n  interfaces {\n    ...TypeRef\n  }\n  enumValues(includeDeprecated: true) {\n    name\n    description\n    isDeprecated\n    deprecationReason\n  }\n  possibleTypes {\n    ...TypeRef\n  }\n}\n\nfragment InputValue on __InputValue {\n  name\n  description\n  type {\n    ...TypeRef\n  }\n  defaultValue\n}\n\nfragment TypeRef on __Type {\n  kind\n  name\n  ofType {\n    kind\n    name\n    ofType {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n}\n",
      },
    });
    if (res.error) {
      message.error(res.data);
    } else {
      message.success("Schema has been loaded");
    }
    yield* put(Actions.loadGqlSchemaEnd(res.data));
  } catch (_e) {
    yield* put(Actions.loadGqlSchemaEnd(null));
  } finally {
    if (yield* cancelled()) {
      yield* put(Actions.loadGqlSchemaEnd(null));
      client.cancel();
    }
  }
}

export default function* watchGqlSchema() {
  while (yield* take(Actions.loadGqlSchema.type)) {
    const task = yield* fork(gqlSchemaSaga);
    const [cancelCase] = yield* race([
      take(Actions.cancelLoadGqlSchema.type),
      take(Actions.loadGqlSchemaEnd.type),
    ]);
    if (cancelCase) {
      yield* cancel(task);
    }
  }
}
