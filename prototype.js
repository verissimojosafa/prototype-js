const fetch = require ('node-fetch')

const address = {
    _cep: "",

    cep: {
        get: function() {
            const cep = this._cep.slice(0, 3) + '.' + this._cep.slice(3, 6) + '-' + this._cep.slice(6, 8);
            return cep;
        },
        set: async function(value) {
            const mask = /[0-9]/g
            this._cep = value.match(mask).slice(0, 8).join('');
        },
        enumerable: true,
        configurable: false
    },

    getAddressData: {
        value: async function() {
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
        writable: false,
        enumerable: false,
        configurable: false,
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
        writable: false,
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
        writable: false,
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

person.name = "josafa";
person.email = "josafaverissimo98@gmail.com"
console.log(person.toString())

address.cep = "5dsad7sad0sa7sa5dsa4dssadasasaddssadsaad4dsda0";
const addressData = address.getAddressData()
    .then(address => {
        console.log(address.toString())
    })
