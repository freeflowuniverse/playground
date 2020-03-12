import React from "react";
import Inspector from "@open-rpc/inspector";
import { Grid, Button, Tooltip } from "@material-ui/core";
import { IMethodPluginProps } from "@open-rpc/docs-react/build/Methods/Methods";
import searchBarStore from "../stores/searchBarStore";
import { ExamplePairingObject, ExampleObject } from "@open-rpc/meta-schema";
import useInspectorActionStore from "../stores/inspectorActionStore";

const InspectorPlugin: React.FC<IMethodPluginProps> = (props) => {
  const [searchUrl] = searchBarStore();
  const [inspectorContents, setInspectorContents] = useInspectorActionStore();
  const method = props.openrpcMethodObject;
  const examplePosition = 0;
  let example;
  let exampleParams: any;
  if (method && method.examples && method.examples[examplePosition]) {
    example = method.examples[examplePosition] as ExamplePairingObject;
    exampleParams = (example.params as ExampleObject[]).map((p) => p.value);
  }
  return (
    <Tooltip title="Open in Inspector">
      <Button variant="contained" onClick={() => setInspectorContents({
        url: searchUrl,
        openrpcMethodObject: props.openrpcMethodObject,
        request: {
          jsonrpc: "2.0",
          id: 0,
          method: method.name,
          params: exampleParams || [],
        },
      })}>🕵️‍♂️ Try It Now</Button>
    </Tooltip>
  );
};

export default InspectorPlugin;
