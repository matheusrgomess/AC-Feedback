const { extendTheme } = require("@chakra-ui/react");

const theme = extendTheme({
  config: {
    initialColorMode: "white",
    useSystemColorMode: false
  },

  styles: {
    global: (props) => ({
      body: {
        bg: props.colorMode === "dark" ? "#1c222b" : "#ffffff",
        color: props.colorMode === "dark" ? "#ffffff" : "#000000",
      },
      hr: {
        borderColor: props.colorMode === "dark" ? "#ffffff" : "#000000",
      },
    }),
  },

  fonts: {
    heading: `'Montserrat', sans-serif`,
    body: `'Montserrat', sans-serif`,
  },
})

export default theme