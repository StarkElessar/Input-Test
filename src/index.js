import "@babel/polyfill"

// Font Awesome 5 (free)
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

// project code
import './styles/style.scss'

// import './components/phoneInputMask'
import phoneInputMask from './components/phoneInputMask'
import submissionForms from './components/sendingDataFromForms'

phoneInputMask()
submissionForms()