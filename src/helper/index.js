export * from "./API";
export const formatDate = (input) => {
    var d = new Date(input)
    return d.toLocaleString();
}
