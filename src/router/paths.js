/**
 * Define all of your application routes here
 * for more information on routes, see the
 * official documentation https://router.vuejs.org/en/
 */
export default [
  {
    // Relative to /src/views
    path: '/login',
    name: 'Login',
    view: 'Login'
  },
  {
    path: '/signup',
    name: 'Sign Up',
    view: 'SignUp'
  },
  {
    path: '/patient-list',
    name: 'Patient List',
    view: 'PatientList',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/patient-stats/:id',
    name: 'Patient Stats',
    view: 'PatientStats',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/patient-medicine/:id',
    name: 'Patient Medicines',
    view: 'PatientMedicine',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/patient-record/:id',
    name: 'Patient Records',
    view: 'PatientRecord',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/patient-symptom/:id',
    name: 'Patient Symptoms',
    view: 'PatientSymptom',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/patient-timeline/:id',
    name: 'Patient Timeline',
    view: 'PatientTimeline',
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/dashboard',
    name: 'Admin dashboard',
    view: 'Dashboard'

  },
  {
    path: '/404',
    name: 'Page not Found :(',
    view: 'PageNotFound'
  }
  // {
  //   path: '/user-profile',
  //   name: 'User Profile',
  //   view: 'UserProfile'
  // },
  // {
  //   path: '/table-list',
  //   name: 'Table List',
  //   view: 'TableList'
  // },
  // {
  //   path: '/typography',
  //   view: 'Typography'
  // },
  // {
  //   path: '/icons',
  //   view: 'Icons'
  // },
  // {
  //   path: '/maps',
  //   view: 'Maps'
  // },
  // {
  //   path: '/notifications',
  //   view: 'Notifications'
  // },
  // {
  //   path: '/upgrade',
  //   name: 'Upgrade to PRO',
  //   view: 'Upgrade'
  // },
  // {
  //   path: '/temp',
  //   name: 'Temp',
  //   view: 'Temp'
  // }
]
