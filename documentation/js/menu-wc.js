'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">zara-api documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-b514523006d0fa76d095d3adae262f7c3fc041fc1bb03cfb0414601ffe7c06f654e6f8e8ed9985753dd459f452bd77c25efd4a9d400979b20b1980253a22e516"' : 'data-bs-target="#xs-injectables-links-module-AppModule-b514523006d0fa76d095d3adae262f7c3fc041fc1bb03cfb0414601ffe7c06f654e6f8e8ed9985753dd459f452bd77c25efd4a9d400979b20b1980253a22e516"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-b514523006d0fa76d095d3adae262f7c3fc041fc1bb03cfb0414601ffe7c06f654e6f8e8ed9985753dd459f452bd77c25efd4a9d400979b20b1980253a22e516"' :
                                        'id="xs-injectables-links-module-AppModule-b514523006d0fa76d095d3adae262f7c3fc041fc1bb03cfb0414601ffe7c06f654e6f8e8ed9985753dd459f452bd77c25efd4a9d400979b20b1980253a22e516"' }>
                                        <li class="link">
                                            <a href="injectables/TaskSchedule.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TaskSchedule</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' :
                                            'id="xs-controllers-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' :
                                        'id="xs-injectables-links-module-AuthModule-0ff845e507ec58f458475ce535691ae8a443b0205d2914e75bbe95348b1d26314ddbaf8b0cb4e456b8944193d16d077f511f049dc7f45fbbdc527a86f677196b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/MailModule.html" data-type="entity-link" >MailModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-MailModule-9bcbd085adc49173299808bb46947aacf6d22c9fbd41e9807d9f89360898c0ef9148b281505fa5c24efdeb90728c4308691ea185b9948fbf6bbe8a42cb48f312"' : 'data-bs-target="#xs-injectables-links-module-MailModule-9bcbd085adc49173299808bb46947aacf6d22c9fbd41e9807d9f89360898c0ef9148b281505fa5c24efdeb90728c4308691ea185b9948fbf6bbe8a42cb48f312"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-MailModule-9bcbd085adc49173299808bb46947aacf6d22c9fbd41e9807d9f89360898c0ef9148b281505fa5c24efdeb90728c4308691ea185b9948fbf6bbe8a42cb48f312"' :
                                        'id="xs-injectables-links-module-MailModule-9bcbd085adc49173299808bb46947aacf6d22c9fbd41e9807d9f89360898c0ef9148b281505fa5c24efdeb90728c4308691ea185b9948fbf6bbe8a42cb48f312"' }>
                                        <li class="link">
                                            <a href="injectables/MailService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MailService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostModule.html" data-type="entity-link" >PostModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostModule-eed48f160a3ab2f8b8967a6a0b7d7aa1c941b333102ced296f08681d1a2c7b666239829f7dc30a4372adf5061cfa2cd658aad89bb303f1fed85aab323ace6bcb"' : 'data-bs-target="#xs-injectables-links-module-PostModule-eed48f160a3ab2f8b8967a6a0b7d7aa1c941b333102ced296f08681d1a2c7b666239829f7dc30a4372adf5061cfa2cd658aad89bb303f1fed85aab323ace6bcb"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostModule-eed48f160a3ab2f8b8967a6a0b7d7aa1c941b333102ced296f08681d1a2c7b666239829f7dc30a4372adf5061cfa2cd658aad89bb303f1fed85aab323ace6bcb"' :
                                        'id="xs-injectables-links-module-PostModule-eed48f160a3ab2f8b8967a6a0b7d7aa1c941b333102ced296f08681d1a2c7b666239829f7dc30a4372adf5061cfa2cd658aad89bb303f1fed85aab323ace6bcb"' }>
                                        <li class="link">
                                            <a href="injectables/PostService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PrismaModule.html" data-type="entity-link" >PrismaModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' : 'data-bs-target="#xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' :
                                        'id="xs-injectables-links-module-PrismaModule-7ec46d5213648d6af195ca52dfa87b1c4755e5bf4d88e606af4a6f96fffe160393eacdce8d2a5e5c86609ba2e65e54573d9bd60b03145287dbc37bed02a6aff4"' }>
                                        <li class="link">
                                            <a href="injectables/PrismaService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PrismaService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/StorageModule.html" data-type="entity-link" >StorageModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-StorageModule-f9b352ce41454d154dbe94fd58432de19c63e2f51fa0035e8e788bffa61e173e28f629e48f5d25595183766acba5a181008f4df7ee661ef3b673efc95bf31291"' : 'data-bs-target="#xs-injectables-links-module-StorageModule-f9b352ce41454d154dbe94fd58432de19c63e2f51fa0035e8e788bffa61e173e28f629e48f5d25595183766acba5a181008f4df7ee661ef3b673efc95bf31291"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-StorageModule-f9b352ce41454d154dbe94fd58432de19c63e2f51fa0035e8e788bffa61e173e28f629e48f5d25595183766acba5a181008f4df7ee661ef3b673efc95bf31291"' :
                                        'id="xs-injectables-links-module-StorageModule-f9b352ce41454d154dbe94fd58432de19c63e2f51fa0035e8e788bffa61e173e28f629e48f5d25595183766acba5a181008f4df7ee661ef3b673efc95bf31291"' }>
                                        <li class="link">
                                            <a href="injectables/StorageService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StorageService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' :
                                            'id="xs-controllers-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' :
                                        'id="xs-injectables-links-module-UsersModule-0e2112d8ec5f291f1e8d54e230bca7f56d79b3313e1e15cc77e84191cf738df725e23d1eba1e818954d440d98b05e45a83cfc5f229e32fdf5e4770fb73a9efb4"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto-1.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginDto.html" data-type="entity-link" >LoginDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/UpdateUserDto.html" data-type="entity-link" >UpdateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link" >User</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/LoggerMiddleware.html" data-type="entity-link" >LoggerMiddleware</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ResponseInterceptor.html" data-type="entity-link" >ResponseInterceptor</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/RolesGuard.html" data-type="entity-link" >RolesGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Response.html" data-type="entity-link" >Response</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});