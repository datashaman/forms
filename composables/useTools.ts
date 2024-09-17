export const useTools = () => {
  const functions = {
    getCurrentTime: () => {
      return {
        time: new Date().toLocaleTimeString(),
      };
    },
    setFormHTML: (args) => {},
  };

  const schemas = {
    getCurrentTime: {
      type: "function",
      function: {
        name: "getCurrentTime",
      },
    },
  };

  const defineTools = (tools) => {
    return tools.map((name) => {
      return schemas[name];
    });
  };

  const runTool = async (name, args) => {
    if (!functions[name]) {
      throw new Error(`Tool "${name}" not found`);
    }

    return functions[name](args);
  };

  const handleToolCall = async (toolCall) => {
    console.log("Handling tool call:", toolCall);
    const args = JSON.parse(toolCall.function.arguments);
    return runTool(toolCall.function.name, args);
  };

  return {
    defineTools,
    runTool,
    handleToolCall,
  };
};
