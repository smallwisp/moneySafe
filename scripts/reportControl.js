const financeReport = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportOperationList = document.querySelector('.report__operation-list');
const reportDates = document.querySelector('.report__dates');


const typesOperation = {
  income: 'доход',
  expenses: 'расход',
} 

const closeReport = ({ target }) => {
  if (target.closest('.report__close') || (!target.closest('.report') && target !== financeReport)) {
    gsap.to(report, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: 'expo.in',
      onComplete() {
        report.style.visibility = 'hidden'
      } 
    })

    document.removeEventListener('click', closeReport)
  }
};

const openReport = () => {
  report.style.visibility = 'visible'

  gsap.to(report, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: 'expo.out',
  })

  document.addEventListener('click', closeReport)
};

const renderReport = (data) => {
  reportOperationList.textContent = ''

  const reportRows = data.map(({category, amount, description, date, type}) => {
    const reportRow = document.createElement('tr')
    reportRow.classList.add('report__row')

    reportRow.innerHTML = `
      <td class="report__cell">${category}</td>
      <td class="report__cell" style="text-align: right">${amount.toLocaleString()}&nbsp;₽</td>
      <td class="report__cell">${description}</td>
      <td class="report__cell">${reformatDate(date)}</td>
      <td class="report__cell">${typesOperation[type]}</td>
      <td class="report__action-cell">
        <button
          class="report__button report__button_table">&#10006;</button>
      </td>
    `

    return reportRow
  })

  reportOperationList.append(...reportRows)
};



export const reportControl = () => {
  financeReport.addEventListener('click', async () => {
    const textContent = financeReport.textContent
    financeReport.textContent = 'Загрузка'
    financeReport.disabled = true
  
    const data = await getData('/test')
  
    financeReport.textContent = textContent
    financeReport.disabled = false
    renderReport(data)
    openReport()
  })
  
  reportDates.addEventListener('submit', async(event) => {
    event.preventDefault()
  
    const formData =  Object.fromEntries(new FormData(reportDates))
  
    const searchParams = new URLSearchParams()
  
    if (formData.startDate) {
      searchParams.append('startDate', formData.startDate)
    }
  
    if (formData.endDate) {
      searchParams.append('endDate', formData.endDate)
    }
  
    const queryString = searchParams.toString()
    const url = queryString ? `/test?${queryString}` : '/test'
  
    const data = await getData(url)
    renderReport(data)
  
  })
}