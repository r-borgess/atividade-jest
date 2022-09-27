const request = require('supertest');
const app = require('../src/app');
const animalsData = require('../src/data/animals.json');
const fs = require('fs');

describe('insercao de animais', () => {
    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('cadastro de animal bem sucedido', async () => {
        const resposta = await request(app).post('/animais?nome=Spike&especie=Cachorro&idade=3');
        expect(resposta.status).toBe(201);//sucesso
    });

    it('cadastro de animal com idade invalida', async () => {
        const resposta = await request(app).post('/animais?nome=Mimi&especie=Gato&idade=jovem');
        expect(resposta.status).toBe(400);//falha
    });

    it('cadastro de animal com nome curto', async () => {
        const resposta = await request(app).post('/animais?nome=J&especie=Hamster&idade=1');
        expect(resposta.status).toBe(400);//falha
    });

    
});

describe('retorno de animais', () => {

    beforeAll(() => {
        animalsData.push({
            'id': 'AnimalTeste1',
            'nome': 'Spike',
            'especie': 'Cachorro',
            'idade': 3
        });
        animalsData.push({
            'id': 'AnimalTeste2',
            'nome': 'Mimi',
            'especie': 'Gato',
            'idade': 'jovem'
        });
        animalsData.push({
            'id': 'AnimalTeste3',
            'nome': 'J',
            'especie': 'Hamster',
            'idade': 1
        });
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    afterAll(() => {
        while(animalsData.length > 0){
            animalsData.pop();
        }
        fs.writeFileSync('src/data/animals.json', JSON.stringify(animalsData));
    });

    it('retorno de lista de todos os animais cadastrados', async () => {
        const resposta = await request(app).get('/animais');
        expect(resposta.status).toBe(200);//sucesso
        expect(resposta.body.length).toBe(3);//tam 3
        //console.log(resposta.body)
    });
})
