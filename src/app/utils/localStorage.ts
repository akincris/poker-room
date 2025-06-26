const getLSValue = (field: string) => localStorage.getItem(field);
const setLSValue = (field: string, value: any) => localStorage.setItem(field, value);
const clearLSValue = (field: string) => localStorage.removeItem(field);

export { getLSValue, setLSValue, clearLSValue };
