describe('Central de Atendimento ao Cliente TAT', () => {
    beforeEach(() => {
        cy.visit('./src/index.html');
    })

    it('verifica o título da aplicação', () => {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preencher os campos obrigatórios e envia formulário', () => {
        cy.get('#firstName').type('Marcos');
        cy.get('#lastName').type('Atayde');
        cy.get('#email').type('marcosatayde@ataydequality.com.br');
        cy.get('#open-text-area').type('Obrigado!')
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible')
    })

    it('Preencher os campos obrigatórios e envia formulário com delay', () => {
        const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwyxz', 10)
        cy.get('#firstName').type('Marcos');
        cy.get('#lastName').type('Atayde');
        cy.get('#email').type('marcosatayde@ataydequality.com.br');
        cy.get('#open-text-area').type(longText, { delay: 10 })
        cy.get('button[type="submit"]').click();

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    })

    it('Campo de telefone continua vazio quando preenchido com valor não numérico', () => {
        cy.get('#phone')
            .type('abcde')
            .should('have.value', '')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Marcos');
        cy.get('#lastName').type('Atayde');
        cy.get('#email').type('marcosatayde@ataydequality.com.br');
        cy.get('#phone-checkbox').click();
        cy.get('#open-text-area').type('Obrigado!')
        cy.get('button[type="submit"]').click();

        cy.get('.error').should('be.visible');
    })

    it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Marcos')
            .should('have.value', 'Marcos')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Atayde')
            .should('have.value', 'Atayde')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('marcosatayde@gmail.com')
            .should('have.value', 'marcosatayde@gmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('11973156073')
            .should('have.value', '11973156073')
            .clear()
            .should('have.value', '')

    })

    it('envia o formuário com sucesso usando um comando customizado', () => {
        const data = {
            firstName: 'Marcos',
            lastName: 'Atayde',
            email: 'marcosatayde@gmail.com',
            text: 'Teste'
        }
        cy.fillMandatoryFieldsAndSubmit()

        cy.get('.success').should('be.visible');
    })

    it('Clicar em um elemento com contains', () => {
        cy.get('#firstName').type('Marcos');
        cy.get('#lastName').type('Atayde');
        cy.get('#email').type('marcosatayde@ataydequality.com.br');
        cy.get('#open-text-area').type('Obrigado!')
        cy.contains('button', 'Enviar').click();

        cy.get('.success').should('be.visible')
    })

    it('Seleciona um produto (Youtube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu texto', () => {
        cy.get('#product')
            .select('Mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu texto', () => {
        cy.get('#product')
            .select('Blog')
            .should('have.value', 'blog')
    })

    it('Seleciona um produto (Cursos) por seu texto', () => {
        cy.get('#product')
            .select('Cursos')
            .should('have.value', 'cursos')
    })

    it('Seleciona um produto (Mentoria) pelo seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (YouTube) pelo seu valor (value)', () => {
        cy.get('#product')
            .select('youtube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Cursos) pelo seu valor (value)', () => {
        cy.get('#product')
            .select('cursos')
            .should('have.value', 'cursos')
    })

    it('Seleciona um produto (Blog) pelo seu valor (value)', () => {
        cy.get('#product')
            .select('blog')
            .should('have.value', 'blog')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Seleciona um produto (Cursos) por seu índice', () => {
        cy.get('#product')
            .select(2)
            .should('have.value', 'cursos')
    })

    it('Seleciona um produto (Mentoria) por seu índice', () => {
        cy.get('#product')
            .select(3)
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (YouTube) por seu índice', () => {
        cy.get('#product')
            .select(4)
            .should('have.value', 'youtube')
    })

    it('Marca o tipo de atendimento (Feedback)', () => {
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('be.checked')
    })

    it('Marca cada tipo de atendimento', () => {
        cy.get('input[type="radio"]')
            .each(typeOfService => {
                cy.wrap(typeOfService)
                    .check()
                    .should('be.checked')
            })
    })

    it('marca ambos checkboxes, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.get('#firstName').type('Marcos');
        cy.get('#lastName').type('Atayde');
        cy.get('#email').type('marcosatayde@ataydequality.com.br');
        cy.get('#phone-checkbox').check();
        cy.get('#open-text-area').type('Obrigado!')
        cy.get('button[type="submit"]').click();
        
        cy.get('.error').should('be.visible');

    })

    it('seleciona um arquivo da pasta fixtures', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('#file-upload')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('#file-upload')
            .selectFile('@sampleFile')
            .should(input => {
                expect(input[0].files[0].name).to.equal('example.json')
            })
    })

    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.contains('a', 'Política de Privacidade')
            .should('have.attr', 'href', 'privacy.html')
            .and('have.attr', 'target', '_blank')
    })

    it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.contains('a', 'Política de Privacidade')
            .invoke('removeAttr', 'target')
            .click()

        cy.contains('h1', 'CAC TAT - Política de Privacidade')
            .should('be.visible')
    })

})