export const submitAction = (data) => {
  return {
    type: 'SUBMIT',
    title: data.title,
    description: data.description,
    plandate: data.plandate
  };
};
