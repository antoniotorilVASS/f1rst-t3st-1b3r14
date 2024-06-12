/// <reference types="cypress" />
Cypress.on('uncaught:exception', (err, runnable) => {
	// Devuelve false para evitar que Cypress falle la prueba cuando se detecte una
	// excepción no capturada
	return false;
});
describe('Iberia Test Suite', function() {
	const hideCommandLogRequests = () => {
		const app = window.top;
		if (!app.document.head.querySelector('[data-hide-command-log-request]')) {
			const style = app.document.createElement('style');
			style.innerHTML = '.command-name-request, .command-name-xhr { display: none }';
			style.setAttribute('data-hide-command-log-request', '');
			app.document.head.appendChild(style);
		}
	};
	beforeEach(function() {
		// Hide command requests logs in Cypress
		hideCommandLogRequests();
		// Load URL from fixture file
		cy.fixture('example.json').then(function(data) {
			this.url = data.url;
			// Visit the URL
			cy.visit(this.url);
		});
		cy.wait(5000);
		cy.xpath('//button[@id="onetrust-accept-btn-handler"]').click({
			force: true
		});
		// Load data from fixture file
		cy.fixture('example.json').then(function(data) {
			this.data = data;
		});
	});
	it('should open and close accordions and verify FAQ texts', function() {
		const accordionSelectors = ['.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(2) > .title', '.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(3) > .title', '.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(4) > .title', '.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(5) > .title', '.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(6) > .title', '.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__wrapper:' + 'nth-child(7) > .title'];
		accordionSelectors.forEach(selector => {
			cy.get(selector).should('be.visible').click();
		});
		cy.get('.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__options ' + '> .ibe-accordion__button-collapse').should('be.visible').click();
		cy.wait(1500)
		cy.get('.col-lg-12 > .ibe-infocheckin__box > .ibe-accordion > .ibe-accordion__options ' + '> .ibe-accordion__button-collapse').should('be.visible').click();
		// Test de verificación de texto en FAQ
		const faqs = this.data.faqs;
		Object.keys(faqs).forEach((key, index) => {
			const selector = `:nth-child(${index + 2}) > .title > .link`; // Seleccionar el enésimo hijo
			cy.get(selector).should('be.visible').and('contain.text', faqs[key]);
		});
	});
});