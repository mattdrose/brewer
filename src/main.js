import './main.scss';
import 'lazySizes';

fetch(`${LAMBDA_ENDPOINT}images`, {
  method: 'POST',
  headers: new Headers({
    'Content-Type': 'application/json'
  }),
})
.then((response) => response.json())
.then((data) => console.log(data))
.catch((error) => console.error('Error:', error));

