}

const fetcher = (path, method, body) =>
  new Promise((resolve) => {
    fetch(path, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((res) => {
      if (!res.ok) {
        throw new Error('요청 실패')
      }
      resolve(res.json())
    })
  })
