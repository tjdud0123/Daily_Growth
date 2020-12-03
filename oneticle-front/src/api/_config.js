import axios from 'axios';

const ApiConfig = axios.create({
  baseURL: 'http://3.22.173.242:3000',
  headers: {
    'Content-Type': 'application/json',
    jwt:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsIm5hbWUiOiLsl4Tst6jsl4UiLCJqb2IiOiLqsJzrsJwiLCJqb2JEZXRhaWwiOiLtlITroaDtirjslaTrk5wiLCJpYXQiOjE2MDY5Mjg1OTUsImV4cCI6MTYwODEzODE5NSwiaXNzIjoib3VyLXNvcHQifQ.0ChkHtp0VkriGehi9iQHEvojN_lg2Vjoo4hk16otM9A',
  },
});

export default ApiConfig;
