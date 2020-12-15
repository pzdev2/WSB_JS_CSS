function prepareObject() {
    const form = document.getElementById("element-form");
    const data = new FormData(form);

    const object = {};
    for (let el of data.entries()) {
        object[el[0]] = el[1];
    }

    return object;
}

function addElement() {

    const object = prepareObject();

    const valid = validate(object);
    if (!valid) {
        return;
    }

    const newPre = document.createElement("pre");
    newPre.className = "column half-column element";
    newPre.innerText = JSON.stringify(object, null, 2);

    document.getElementById("db").append(newPre);
}


function validate(object) {

    // walidujemy wszystkie pola
    const validNumber = validateNumber(object.number);
    const validRadio = validateRadio(object.favouriteNumber);
    const validPassword = validatePassword(object.password);
    const validRepeatedPassword = validateRepeatedPassword(object.password, object.password2);

    // zwracamy wynik walidacji - że formularz ją przeszedł, wszystkie pola muszą być wypełnione poprawnie
    return validNumber && validRadio && validPassword && validRepeatedPassword;
}

function validateNumber(number) {

    // walidujemy numer, podany w argumencie - w tym wypadku sprawdzamy, czy pasuje do wzorca
    const valid = /^\d+([.,]\d{1,2})?$/.test(number);

    // odszukujemy na stronie odpowiednie pole - input, w którym został wpisany numer
    const input = document.querySelector("input[name='number']");

    if (valid) {
        // jeśli numer pasuje do wzorca - usuwamy ewentualne komunikaty walidacyjne, jeśli są

        // ustawiamy pustą klasę - w razie jakby input był wcześniej oznaczony na czerwono
        input.className = "";

        const nameMessage = document.getElementById("number-input-message");
        if (nameMessage) {
            //jeśli wyświetla się komunikat - usuwamy go
            nameMessage.parentElement.removeChild(nameMessage);
        }
    } else {
        // numer nie pasuje do wzorca - dodajemy komunikaty walidacyjne, jeśli ich nie ma

        // dodajemy inputowi klasę, która oznacza, że coś z nim nie tak
        input.className = "invalid";

        // sprawdzamy, czy wyświetla się komunikat o błędzie w polu z numerem
        if (!document.getElementById("number-input-message")) {
            // tworzymy element, który będzie mówił o błędzie w wybranym polu
            const small = document.createElement("small");
            small.id = "number-input-message"; // nadajemy id - potem dzięki niemu dostaniemy się do elementu, żeby go usunąć
            small.className = "invalid"; // nadajemy klasę - żeby był czerwony
            small.innerText = "Niepoprawny numer - dopuszczalna tylko dodatnia liczba z maksymalnie dwoma cyframi po przecinku"; // dodajemy tekst, który wyświetli się użytkownikowi

            // doczepiamy element jako "rodzeństwo" inputa
            input.parentElement.appendChild(small);
        }
    }

    // zwracamy wynik walidacji
    return valid;
}

function validateRadio(radio) {

    let valid = false;
    
    if (radio !== undefined) {
        valid = true;
    }

    const input = document.querySelector("input[name='favouriteNumber']");

    if (valid) {

        input.className = "";

        const nameMessage = document.getElementById("radio-uncheck-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }

    } else {

        input.className = "invalid";

        if (!document.getElementById("radio-uncheck-message")) {
            const smallRadio = document.createElement("small");
            smallRadio.id = "radio-uncheck-message";
            smallRadio.className = "invalid";
            smallRadio.innerText = "Jedno \"radio\" musi być wybrane";

            input.parentElement.appendChild(smallRadio);
        }
    }

    return valid;
}

function validatePassword(password) {
    // regex do hasła: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
    
    const input = document.querySelector("input[name='password']");

    if (valid) {

        input.className = "";

        const nameMessage = document.getElementById("password-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }

    } else {

        input.className = "invalid";

        if (!document.getElementById("password-input-message")) {
            const smallPass = document.createElement("small");
            smallPass.id = "password-input-message";
            smallPass.className = "invalid";
            smallPass.innerText = "Hasło musi mieć min. 8 znaków, w tym: cyfre, małą i duzą litere";

            input.parentElement.appendChild(smallPass);
        }
    }

    return valid;
}

function validateRepeatedPassword(password, repeatedPassword) {

    let valid = false;

    if(password === repeatedPassword && repeatedPassword !== "") {
        valid = true;
    }
    
    const input = document.querySelector("input[name='password2']");

    if (valid) {

        input.className = "";

        const nameMessage = document.getElementById("rePassword-input-message");
        if (nameMessage) {
            nameMessage.parentElement.removeChild(nameMessage);
        }

    } else {

        input.className = "invalid";

        if (!document.getElementById("rePassword-input-message")) {
            const smallRePass = document.createElement("small");
            smallRePass.id = "rePassword-input-message";
            smallRePass.className = "invalid";
            smallRePass.innerText = "Pole \"Powtórz hasło\" nie moze być puste i musi być takie samo jak pole \"Hasło\"";

            input.parentElement.appendChild(smallRePass);
        }
    }

    return valid;
}