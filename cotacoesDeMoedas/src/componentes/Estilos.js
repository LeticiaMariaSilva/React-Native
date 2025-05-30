import { StyleSheet } from "react-native";

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  linha: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 10,
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 10,
  },
  primeiralinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  simbolo: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#b3b3d8",
  },
  nomeFormatado: {
    fontSize: 16,
  },
  simbolo1: {
    fontWeight: "bold",
    fontSize: 24,
    textTransform: "uppercase",
    color: "#b3b3d8",
    marginBottom: 10,
    textAlign: "center",
  },
  linha2: {
    marginTop: 10,
    backgroundColor: "#ffffff",
    borderRadius: 12,

    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: 10,
  },
  resultado: {
    fontWeight: "bold",
    fontSize: 18,
    textTransform: "uppercase",
    color: "#b3b3d8",
    
  },
  coluna2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 19,
    textTransform: "uppercase",
    color: "#b3b3d8",
    textAlign: "center",
    marginTop: 14,

  },
  botao: {
    backgroundColor: "#b3b3d8",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  text: {
    fontWeight: "black",
    fontSize: 15,
    marginTop: 10,
  },
});

export default estilos;
