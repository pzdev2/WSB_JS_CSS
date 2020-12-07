## Odpowiedzi na pytania do kodu, które się pojawiły

### JSON.stringify

```js
const newPre = document.createElement("pre");
newPre.className = "column half-column element";
newPre.innerText = JSON.stringify(object, null, 2);
```

Znacznik `<pre>` umożliwia wyświetlenie na stronie uprzednio sformatowanego tekstu - 
HTML zwykle ignoruje nasze spacje, tabulatory i wcięcia.

`JSON.stringify` umożliwia nam z kolei wstępne sformatowanie wyświetlanego tekstu.

JSON - to format wymiany danych, jeszcze będziemy o nim mówić.
W tym wypadku, żeby ładnie wyświetlić obiekt na stronie, konwertujemy 
nasz objekt javascriptowy (`object`) na JSONa (JSON wyświetla się na stronie w sekcji "Baza danych").

Testowo można wykonać sobie w konsoli przeglądarki metody konwertujące i zobaczyć, co zwracają:

- obiekt JS -> JSON:
```js
JSON.stringify({name: "Waldek", age: 13})
```

- JSON -> obiekt JS
```js
JSON.parse('{"name": "Waldek", "age": 13}')
```

Metoda `JSON.stringify` może przyjmować więcej argumentów, w przykładowym kodzie:

- drugi argument (w przykładowym kodzie - `null`) - pozwala na wyfiltrowanie niektórych pól z obiektu, gdyby np. interesował nas tylko wiek Waldka:
```js
JSON.stringify({name: "Waldek", age: 13}, ["age"])
``` 

- trzeci argument (w przykładowym kodzie - `2`) - określa wielkość wcięć, jakie są dodane przy formatowaniu JSONa.
Można poeksperymentować - zmienić tam liczbę np. na 10 i spróbować dodać obiekt do bazy - wcięcia w wyświetlanych
JSONach będą większe. 


### FormData

```js
const form = document.getElementById("element-form");
const data = new FormData(form);

const object = {};
for (let el of data.entries()) {
    object[el[0]] = el[1];
}

return object;
```

Ten fragment umożliwia nam wyciągnięcie danych wpisanych do formularza i przerobienie ich na obiekt javascriptowy
(który potem konwertujemy na JSON, metodą `JSON.stringify`).

- najpierw wyszukujemy na stronie formularz - `const form = document.getElementById("element-form");`
- następnie na podstawie formularza tworzymy obiekt `FormData`
- obiekt `FormData` posiada metodę `entries`, która umożliwia iterację po polach formularza
- w pętli tworzymy obiekt - "kluczami" w tym obiekcie są nazwy pól formularza, a "wartościami" zawartości tych pól
