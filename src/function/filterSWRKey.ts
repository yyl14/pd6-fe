// eslint-disable-next-line @typescript-eslint/no-explicit-any
const filterSWRKey = (endpoint: string) => (key: any) => Array.isArray(key) && key[0] === endpoint;

export default filterSWRKey;
