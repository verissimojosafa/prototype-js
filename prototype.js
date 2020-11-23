const fetch = require('node-fetch')

const address = {
    _cep: "",

    get cep() {
        const cep = this._cep.slice(0, 3) + '.' + this._cep.slice(3, 6) + '-' + this._cep.slice(6, 8);
        return cep;
    },

    set cep(value) {
        const mask = /[0-9]/g
        this._cep = value.match(mask).slice(0, 8).join('');
    },

    getAddressData: async function() {
        let cep = this.cep.replace('.', '');
        cep = cep.replace('-', '');

        const cepJson = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => response.json())
            .then(json => json);

        return Object.defineProperties({}, {
            logradouro: { value: cepJson.logradouro, writable: false, enumerable: true, configurable: false},
            bairro: { value: cepJson.bairro, writable: false, enumerable: true, configurable: false},
            localidade: { value: cepJson.localidade, writable: false, enumerable: true, configurable: false},
            uf: { value: cepJson.uf, writable: false, enumerable: true, configurable: false},
            toString: {
                value: function() {
                    return `${this.logradouro},${this.bairro},${this.localidade},${this.uf},`
                }
            }
        })
    },
}

const person = Object.create(address);
Object.defineProperties(person, {
    _name: { value: "", writable: true, enumerable: false, configurable: true},
    _email: { value: "", writable: true, enumerable: false, configurable: true},

    name: {
        get: function name() {
            return this._name;
        },
        set: function name(value) {
            this._name = value.toLowerCase();
        },
        enumerable: true,
        configurable: false,
    },

    email: {
        get: function email() {
            return this._email;
        },
        set: function email(value) {
            this._email = value.replace(/\W/g, '').toLowerCase();
        },
        enumerable: true,
        configurable: false,
    },

    toString: {
        value: function() {
            return `name: ${this.name},\nemail: ${this.email},`;
        },
        writable: true,
        enumerable: false,
        configurable: true,
    }
})

const user = Object.create(person);
Object.defineProperties(user, {
    username: { value: "", writable: true, enumerable: true, configurable: true},
    group: { value: "", writable: true, enumerable: true, configurable: true},
    showData: {
        value: function() {
            this.getAddressData().then(address => {
                console.log(`Name: ${this.name}`);
                console.log(`Email: ${this.email}`);
                console.log(`Username: ${this.username}`);
                console.log(address.toString());
            })
        },
        writable: false,
        enumerable: false,
        configurable: false,
    }
})

user.name = "Josafá Veríssimo";
user.email = "josafaverissimo98@gmail.com";
user.username = "srkiris";
user.cep = "5das7dad0as7dasas5daadasdadass4sasdsdaaddaa4dasdadsad0";
user.showData();
