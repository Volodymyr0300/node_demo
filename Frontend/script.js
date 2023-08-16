// fetch is promise [pending, reject, accept]

const fetchBtn = document.querySelector('#fetch-btn');
const abortBtn = document.querySelector('#abort-btn');
const controller = new AbortController();
fetchBtn.addEventListener('click', async () => {
  const options = {
    method: 'GET',
    // headers: {
    //   authorization: 'apikey here',
    // },
  };
  try {
    const response = await fetch(
      'http://localhost:3000/longwait',
      options,
      controller.signal
    );
    const data = await response.json();
    console.log(data);
  } catch (e) {
    console.error(e.message);
  }
});

abortBtn.addEventListener('click', () => {
  controller.abort();
});
// abort signal
