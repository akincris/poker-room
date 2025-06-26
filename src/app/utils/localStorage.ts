const getSSValue = (field: string) => sessionStorage.getItem(field);
const setSSValue = (field: string, value: any) => sessionStorage.setItem(field, value);
const clearSSValue = (field: string) => sessionStorage.removeItem(field);

export { getSSValue, setSSValue, clearSSValue };
