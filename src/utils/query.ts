export const refineWriteQueryParams = (defaultParams: Record<string, any>): {
  validParams: Record<string, any>
  queryParamString: string
} => {
  const refinedQueryParameters = Object.keys(defaultParams)
    .filter((parameterKey: string) => defaultParams[parameterKey] != null && defaultParams[parameterKey] !== '')
    .reduce((acc: any, param: string): Record<string, any> => {
      acc[param] = defaultParams[param];
      return acc;
    }, {});

  const queryParamString = `{ ${Object.keys(refinedQueryParameters).reduce((acc: string, paramKey: string, index: number): string => {
      acc += `${paramKey}: $${paramKey}, `;
      return acc;
    }, '').slice(0, -2)} }`; // to remove the extra ',' at the end;

  return {
    validParams: refinedQueryParameters,
    queryParamString
  };
};
