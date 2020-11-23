const fetch = require ('node-fetch')

const person = {
    _name: "",
    _email: "",

    get name() {
        return this._name;
    },
    set name(value) {
        this._name = value.toLowerCase();
    },

    get email() {
        return this._email;
    },
    set email(value) {
        this._email = value.replace(/\W/g, '').toLowerCase();
    },

    toString() {
        return `name: ${this.name},\nemail: ${this.email},`;
    }
}

const address = Object.create(person)
Object.defineProperties(address, {
    _cep: { value: "", writable: true, enumerable: false, configurable: true },

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
})

person.name = "josafa";
person.email = "josafaverissimo98@gmail.com"
console.log(person.toString())

address.cep = "5dsad7sad0sa7sa5dsa4dssadasasaddssadsaad4dsda0";
const addressData = address.getAddressData()
    .then(address => {
        console.log(address.toString())
    })
