const produkte = [
    { id: 1, name: "adidas Predator Elite FT FG Jude Bellingham Signature Silber", preis: 339.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/92/2e/9e/1744695310/adidas-predator-elite-ft-fg-silber-ih0894-fussballschuh-right-out.png" },
    { id: 2, name: "adidas Predator Elite FG Jude Bellingham Weiss", preis: 309.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/11/74/c3/1729098765/adidas-predator-elite-fg-weiss-schwarz-id0698-fussballschuh-right-out.png" },
    { id: 3, name: "adidas Predator Elite FT FG Teamgeist Weiss", preis: 329.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/01/69/ab/1742382011/adidas-predator-elite-ft-fg-weiss-jp5730-fussballschuh-right-out.png" },
    { id: 4, name: "adidas F50 Elite LL FG Celestial Victory Blau", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/36/73/e5/1742998586/adidas-f50-fg-blau-ie1250-fussballschuh-right-out.png" },
    { id: 5, name: "adidas F50 Elite LL FG Pure Victory Weiss", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/7e/fe/26/1736401800/adidas-f50-elite-ll-fg-weiss-ie1214-fussballschuh-right-out.png" },
    { id: 6, name: "adidas F50 Elite LL FG Mystic Victory Rosa", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/45/ec/d4/1740638480/adidas-f50-elite-ll-fg-pink-ie1212-fussballschuh-right-out.png" },
    { id: 7, name: "adidas F50 Elite LL FG Polar Victory Weiss", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/0e/8d/00/1738221347/adidas-f50-elite-ll-fg-weiss-ie1216-fussballschuh-right-out.png" },
    { id: 8, name: "adidas F50 Elite LL FG Stealth Victory Schwarz", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=1400/ch-de/media/a4/f6/e1/1737618261/adidas-f50-elite-ll-fg-schwarz-ie1215-fussballschuh-right-out.png" },
    { id: 9, name: "Nike Phantom GX II Elite FG Chromatic Weiss F100", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/80/42/28/1741590775/nike-phantom-gx-ii-elite-fg-weiss-f100-hv4890-fussballschuh-right-out.png" },
    { id: 10, name: "Nike Air Zoom Mercurial Vapor Elite FG Chromatic Weiss F100", preis: 329.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/34/c5/d3/1741588511/nike-jr-air-zoom-mercurial-vapor-elite-fg-weiss-hv4887-fussballschuh-right-out.png" },
    { id: 11, name: "Nike Air Zoom Mercurial Vapor XVI Elite FG United Lila F500", preis: 329.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/95/4a/31/1738737911/nike-air-zoom-mercurial-vapor-xvi-elite-fg-f500-hf1605-fussballschuh-right-out.png" },
    { id: 12, name: "Nike Air Zoom Mercurial Vapor XVI Elite FG Gelb Mad Voltage Gelb Schwarz F700", preis: 319.95, bild: "https://www.11teamsports.com/cdn-cgi/image/format=webp,width=601/ch-de/media/c5/37/7c/1728878811/nike-air-zoom-mercurial-vapor-xvi-elite-fg-f700-fq1457-fussballschuh-right-out.png" }
];

let warenkorb = JSON.parse(localStorage.getItem('warenkorb')) || [];

const homePage = document.getElementById('home-page');
const warenkorbPage = document.getElementById('warenkorb-page');
const homeLink = document.getElementById('home-link');
const warenkorbLink = document.getElementById('warenkorb-link');
const backToShopLink = document.getElementById('back-to-shop');
const warenkorbItems = document.getElementById('warenkorb-items');
const gesamtBetrag = document.getElementById('gesamt-betrag');
const cartCount = document.getElementById('cart-count');

function isOnPage(pageName) {
    return window.location.pathname.includes(pageName);
}

function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('newsletter-success').style.display = 'block';
            newsletterForm.reset();
            
            setTimeout(() => {
                document.getElementById('newsletter-success').style.display = 'none';
            }, 3000);
        });
    }
}

function initKontaktformular() {
    const kontaktForm = document.getElementById('kontakt-form');
    if (kontaktForm) {
        kontaktForm.addEventListener('submit', function(e) {
            e.preventDefault();
            document.getElementById('kontakt-erfolg').style.display = 'block';
            kontaktForm.reset();
            
            setTimeout(() => {
                document.getElementById('kontakt-erfolg').style.display = 'none';
            }, 3000);
        });
    }
}

function filterProdukte() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    if (filterBtns.length > 0) {
        let aktiverKategorieFilter = 'all';
        let aktiverPreisFilter = null;
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const filterType = this.getAttribute('data-filter');
                
                if (['all', 'adidas', 'nike'].includes(filterType)) {
                    document.querySelectorAll('.filter-buttons .filter-btn').forEach(btn => {
                        btn.classList.remove('active');
                    });
                    
                    aktiverKategorieFilter = filterType;
                    this.classList.add('active');
                }
                else if (['unter320', 'ueber320'].includes(filterType)) {
                    if (aktiverPreisFilter === filterType) {
                        this.classList.remove('active');
                        aktiverPreisFilter = null;
                    } else {
                        document.querySelectorAll('.preis-filter .filter-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        
                        aktiverPreisFilter = filterType;
                        this.classList.add('active');
                    }
                }
                
                wendeFilterAn(aktiverKategorieFilter, aktiverPreisFilter);
            });
        });
    }
}

function wendeFilterAn(kategorieFilter, preisFilter) {
    const produktElemente = document.querySelectorAll('.produkt');
    
    produktElemente.forEach(produkt => {
        const produktKategorie = produkt.getAttribute('data-kategorie');
        const produktPreis = parseFloat(produkt.getAttribute('data-preis'));
        
        let zeigeKategorie = kategorieFilter === 'all' || produktKategorie === kategorieFilter;
        let zeigePreis = true;
        
        if (preisFilter === 'unter320') {
            zeigePreis = produktPreis < 320;
        } else if (preisFilter === 'ueber320') {
            zeigePreis = produktPreis >= 320;
        }
        
        if (zeigeKategorie && zeigePreis) {
            produkt.style.display = 'block';
        } else {
            produkt.style.display = 'none';
        }
    });
}

function zeigeWarenkorb() {
    homePage.classList.remove('active');
    warenkorbPage.classList.add('active');
    aktualisiereWarenkorbAnzeige();
}

function zeigeHome() {
    warenkorbPage.classList.remove('active');
    homePage.classList.add('active');
}

function initNavigationEvents() {
    if (homeLink) {
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            zeigeHome();
        });
    }

    if (warenkorbLink) {
        warenkorbLink.addEventListener('click', function(e) {
            e.preventDefault();
            zeigeWarenkorb();
        });
    }

    if (backToShopLink) {
        backToShopLink.addEventListener('click', function(e) {
            e.preventDefault();
            zeigeHome();
        });
    }
}

function initDetailansicht() {
    if (isOnPage('produkt.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const produktId = parseInt(urlParams.get('id'));
        
        if (produktId) {
            const produkt = produkte.find(p => p.id === produktId);
            
            if (produkt) {
                const produktBild = document.getElementById('produkt-bild');
                const produktName = document.getElementById('produkt-name');
                const produktPreis = document.getElementById('produkt-preis');
                
                if (produktBild) produktBild.src = produkt.bild;
                if (produktName) produktName.textContent = produkt.name;
                if (produktPreis) produktPreis.textContent = `CHF ${produkt.preis.toFixed(2)}`;
                
                const aehnlicheContainer = document.getElementById('aehnliche-produkte-container');
                if (aehnlicheContainer) {
                    const kategorie = produkt.name.toLowerCase().includes('adidas') ? 'adidas' : 'nike';
                    
                    const aehnlicheProdukte = produkte
                        .filter(p => p.id !== produktId && p.name.toLowerCase().includes(kategorie))
                        .slice(0, 4);
                    
                    aehnlicheProdukte.forEach(aehnlichesProdukt => {
                        const produktElement = document.createElement('div');
                        produktElement.classList.add('aehnliches-produkt');
                        produktElement.innerHTML = `
                            <a href="produkt.html?id=${aehnlichesProdukt.id}">
                                <img src="${aehnlichesProdukt.bild}" alt="${aehnlichesProdukt.name}">
                                <h3>${aehnlichesProdukt.name}</h3>
                                <p>CHF ${aehnlichesProdukt.preis.toFixed(2)}</p>
                            </a>
                        `;
                        aehnlicheContainer.appendChild(produktElement);
                    });
                }
                
                const addToCartBtn = document.getElementById('add-to-cart-detail');
                if (addToCartBtn) {
                    addToCartBtn.addEventListener('click', function() {
                        const ausgewaehlteGroesse = document.querySelector('.groessen-option.selected');
                        const anzahl = parseInt(document.getElementById('menge-anzahl').textContent);
                        
                        if (!ausgewaehlteGroesse) {
                            alert('Bitte wähle eine Grösse aus');
                            return;
                        }
                        
                        const groesse = ausgewaehlteGroesse.textContent;
                        
                        const vorhandenerIndex = warenkorb.findIndex(item => 
                            item.id === produkt.id && item.groesse === groesse
                        );
                        
                        if (vorhandenerIndex > -1) {
                            warenkorb[vorhandenerIndex].menge += anzahl;
                        } else {
                            warenkorb.push({
                                id: produkt.id,
                                name: produkt.name,
                                preis: produkt.preis,
                                bild: produkt.bild,
                                menge: anzahl,
                                groesse: groesse
                            });
                        }
                        
                        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
                        aktualisiereWarenkorbZaehler();
                        
                        alert('Produkt wurde dem Warenkorb hinzugefügt!');
                    });
                }
                
                const groessenOptions = document.querySelectorAll('.groessen-option');
                if (groessenOptions.length > 0) {
                    groessenOptions.forEach(option => {
                        option.addEventListener('click', function() {
                            groessenOptions.forEach(opt => opt.classList.remove('selected'));
                            this.classList.add('selected');
                        });
                    });
                }
                
                const minusBtn = document.querySelector('.minus-btn');
                const plusBtn = document.querySelector('.plus-btn');
                const mengeAnzahl = document.getElementById('menge-anzahl');
                
                if (minusBtn && plusBtn && mengeAnzahl) {
                    minusBtn.addEventListener('click', function() {
                        let menge = parseInt(mengeAnzahl.textContent);
                        if (menge > 1) {
                            mengeAnzahl.textContent = menge - 1;
                        }
                    });
                    
                    plusBtn.addEventListener('click', function() {
                        let menge = parseInt(mengeAnzahl.textContent);
                        mengeAnzahl.textContent = menge + 1;
                    });
                }
            }
        }
    }
}

function initAddToCartButtons() {
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const produktElement = this.closest('.produkt');
            const produktId = parseInt(produktElement.getAttribute('data-id'));
            
            const produkt = produkte.find(p => p.id === produktId);
            
            const vorhandenerIndex = warenkorb.findIndex(item => item.id === produktId);
            
            if (vorhandenerIndex > -1) {
                warenkorb[vorhandenerIndex].menge += 1;
            } else {
                warenkorb.push({
                    id: produkt.id,
                    name: produkt.name,
                    preis: produkt.preis,
                    bild: produkt.bild,
                    menge: 1
                });
            }
            
            localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
            
            aktualisiereWarenkorbZaehler();
            zeigeWarenkorb();
        });
    });
}

function aktualisiereWarenkorbAnzeige() {
    warenkorbItems.innerHTML = '';
    
    if (warenkorb.length === 0) {
        warenkorbItems.innerHTML = '<div class="leerer-warenkorb"><h2>Dein Warenkorb ist leer</h2><p>Füge Produkte hinzu, um sie hier zu sehen.</p></div>';
    } else {
        warenkorb.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('warenkorb-item');
            itemElement.innerHTML = `
                <img src="${item.bild}" alt="${item.name}">
                <div class="warenkorb-item-info">
                    <h3>${item.name}</h3>
                    <p>CHF ${item.preis.toFixed(2)}</p>
                    ${item.groesse ? `<p>Grösse: ${item.groesse}</p>` : ''}
                </div>
                <div class="warenkorb-item-actions">
                    <button class="menge-button menge-minus" data-id="${item.id}" ${item.groesse ? `data-groesse="${item.groesse}"` : ''}>-</button>
                    <span class="menge">${item.menge}</span>
                    <button class="menge-button menge-plus" data-id="${item.id}" ${item.groesse ? `data-groesse="${item.groesse}"` : ''}>+</button>
                    <button class="entfernen-button" data-id="${item.id}" ${item.groesse ? `data-groesse="${item.groesse}"` : ''}>Entfernen</button>
                </div>
            `;
            warenkorbItems.appendChild(itemElement);
        });
        
        document.querySelectorAll('.menge-minus').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const groesse = this.hasAttribute('data-groesse') ? this.getAttribute('data-groesse') : null;
                aendereMenge(id, -1, groesse);
            });
        });
        
        document.querySelectorAll('.menge-plus').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const groesse = this.hasAttribute('data-groesse') ? this.getAttribute('data-groesse') : null;
                aendereMenge(id, 1, groesse);
            });
        });
        
        document.querySelectorAll('.entfernen-button').forEach(button => {
            button.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                const groesse = this.hasAttribute('data-groesse') ? this.getAttribute('data-groesse') : null;
                entferneProdukt(id, groesse);
            });
        });
    }
    
    berechngeGesamtbetrag();
}

function aendereMenge(id, aenderung, groesse = null) {
    const index = groesse 
        ? warenkorb.findIndex(item => item.id === id && item.groesse === groesse)
        : warenkorb.findIndex(item => item.id === id);
    
    if (index > -1) {
        warenkorb[index].menge += aenderung;
        
        if (warenkorb[index].menge <= 0) {
            warenkorb.splice(index, 1);
        }
        
        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
        aktualisiereWarenkorbAnzeige();
        aktualisiereWarenkorbZaehler();
    }
}

function entferneProdukt(id, groesse = null) {
    const index = groesse 
        ? warenkorb.findIndex(item => item.id === id && item.groesse === groesse)
        : warenkorb.findIndex(item => item.id === id);
    
    if (index > -1) {
        warenkorb.splice(index, 1);
        
        localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
        aktualisiereWarenkorbAnzeige();
        aktualisiereWarenkorbZaehler();
    }
}

function berechngeGesamtbetrag() {
    const gesamtSumme = warenkorb.reduce((summe, item) => summe + (item.preis * item.menge), 0);
    gesamtBetrag.textContent = `CHF ${gesamtSumme.toFixed(2)}`;
}

function aktualisiereWarenkorbZaehler() {
    const anzahl = warenkorb.reduce((summe, item) => summe + item.menge, 0);
    
    const countElements = document.querySelectorAll('#cart-count');
    countElements.forEach(element => {
        element.textContent = anzahl;
    });
}

function init() {
    initNavigationEvents();
    
    initDetailansicht();
    
    filterProdukte();
    
    initAddToCartButtons();
    
    initNewsletter();
    
    initKontaktformular();
    
    aktualisiereWarenkorbZaehler();
    
    if (homePage && !isOnPage('produkt.html') && !isOnPage('kontakt.html')) {
        zeigeHome();
    }
    
    const checkoutButton = document.querySelector('.checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', function() {
            alert('Vielen Dank für deinen Einkauf! Diese Funktion würde normalerweise zum Bezahlvorgang weiterleiten.');
            warenkorb = [];
            localStorage.setItem('warenkorb', JSON.stringify(warenkorb));
            aktualisiereWarenkorbAnzeige();
            aktualisiereWarenkorbZaehler();
        });
    }
}

document.addEventListener('DOMContentLoaded', init);