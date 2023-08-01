const browseParamsTransForm = (params) => {
  console.log(JSON.stringify(params.filter));
  return {
    ...params,
    filter: JSON.stringify(params.filter),
    sort: JSON.stringify(params.sort),
  };
};

export default browseParamsTransForm;
