const submissionForms = () => {
  const allForms    = document.querySelectorAll('form'),
        allInputs   = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]')
  
  phoneInputs.forEach(input => {
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/, '')
    })
  })

  const textMessages = {
    loading: 'Загрузка...',
    succes: 'Спасибо! Скоро мы с Вами свяжемся',
    failure: 'Что-то пошло не так..'
  }

  const postData = async (url, data) => {
    // document.querySelector('.status').textContent = textMessages.loading
    alert(textMessages.loading)

    let result = await fetch(url, {
      method: 'POST',
      body: data
    })

    return await result.text()
  }

  const clearInputs = () => {
    allInputs.forEach(input => input.value = '')
  }

  allForms.forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault()

      // let statusMessage = document.createElement('div')
      // statusMessage.classList.add('status')
      // form.appendChild(statusMessage)

      const formData = new FormData(form)

      postData('../mail-telegram.php', formData)
        .then(result => {
          console.log(result)
          // statusMessage.textContent = textMessages.succes
          alert(textMessages.succes)
        })
        .catch(() => {
          // statusMessage.textContent = textMessages.failure
          alert(textMessages.failure)
        })
        .finally(() => {
          clearInputs()
          // setTimeout(() => {
          //   statusMessage.remove()
          // }, 6000)
        })
    })
  })
}

window.addEventListener('DOMContentLoaded', () => {
  submissionForms()
})