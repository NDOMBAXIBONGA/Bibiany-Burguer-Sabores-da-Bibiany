// ==========================================================================
// BIBIANY BURGUER & SABORES DA BIBIANY - APPLICATION LOGIC
// Local: Lubango, Província da Huíla, Angola
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // State Management
    const state = {
        currentBrand: 'all',
        currentCategory: 'all',
        searchQuery: '',
        cart: JSON.parse(localStorage.getItem('bibiany_cart')) || [],
        orderType: 'delivery', // 'delivery' or 'takeaway'
        selectedZoneId: 'lubango-centro',
        customerName: '',
        customerPhone: '',
        customerAddress: '',
        orderNotes: ''
    };

    // DOM Elements
    const elements = {
        productsGrid: document.getElementById('productsGrid'),
        categoryPills: document.getElementById('categoryPills'),
        brandButtons: document.querySelectorAll('.brand-toggle-btn'),
        searchInput: document.getElementById('menuSearchInput'),
        
        // Cart Drawer
        cartBackdrop: document.getElementById('cartDrawerBackdrop'),
        cartDrawer: document.getElementById('cartDrawer'),
        btnOpenCart: document.getElementById('btnOpenCart'),
        btnCloseCart: document.getElementById('btnCloseCart'),
        cartItemsList: document.getElementById('cartItemsList'),
        cartCounterBadge: document.getElementById('cartCounterBadge'),
        
        // Cart Summary
        cartSubtotal: document.getElementById('cartSubtotal'),
        cartDeliveryFee: document.getElementById('cartDeliveryFee'),
        cartTotal: document.getElementById('cartTotal'),
        orderTypeButtons: document.querySelectorAll('.btn-order-type'),
        cartZoneSelect: document.getElementById('cartZoneSelect'),
        
        // Customer Inputs
        customerNameInput: document.getElementById('customerNameInput'),
        customerPhoneInput: document.getElementById('customerPhoneInput'),
        customerAddressInput: document.getElementById('customerAddressInput'),
        paymentMethodSelect: document.getElementById('paymentMethodSelect'),
        orderNotesInput: document.getElementById('orderNotesInput'),
        btnCheckoutWhatsApp: document.getElementById('btnCheckoutWhatsApp'),
        
        // Mobile Bottom Bar
        mobileBottomBar: document.getElementById('mobileBottomBar'),
        mobileCartTotal: document.getElementById('mobileCartTotal'),
        btnMobileOpenCart: document.getElementById('btnMobileOpenCart'),
        
        // Zone Calc on page
        pageZoneSelect: document.getElementById('pageZoneSelect'),
        pageZoneFeeDisplay: document.getElementById('pageZoneFeeDisplay'),
        pageZoneTimeDisplay: document.getElementById('pageZoneTimeDisplay'),

        // Item Modal
        itemModalBackdrop: document.getElementById('itemModalBackdrop'),
        modalItemImg: document.getElementById('modalItemImg'),
        modalItemTitle: document.getElementById('modalItemTitle'),
        modalItemDesc: document.getElementById('modalItemDesc'),
        modalItemPrice: document.getElementById('modalItemPrice'),
        modalItemNotes: document.getElementById('modalItemNotes'),
        btnModalConfirmAdd: document.getElementById('btnModalConfirmAdd'),
        btnModalClose: document.getElementById('btnModalClose')
    };

    let activeModalItem = null;

    // Helper: Format Kwanza Currency (Usa separador de pontos sem caracteres especiais)
    function formatKz(amount) {
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' Kz';
    }

    // Audio Feedback using Web Audio API
    function playAudioFeedback(type = 'add') {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);

            if (type === 'add') {
                osc.type = 'sine';
                osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12); // A5
                gain.gain.setValueAtTime(0.15, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.12);
            } else {
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(440, ctx.currentTime);
                gain.gain.setValueAtTime(0.08, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.08);
                osc.start(ctx.currentTime);
                osc.stop(ctx.currentTime + 0.08);
            }
        } catch (e) {
            // Audio context not allowed or not supported; ignore gracefully
        }
    }

    // ==========================================================================
    // RENDER CATEGORIES
    // ==========================================================================
    function renderCategoryPills() {
        const filteredCategories = MENU_DATA.categories.filter(cat => {
            if (state.currentBrand === 'all') return true;
            return cat.brand === 'all' || cat.brand === state.currentBrand;
        });

        elements.categoryPills.innerHTML = filteredCategories.map(cat => {
            const isActive = state.currentCategory === cat.id ? 'active' : '';
            return `
                <button class="category-pill ${isActive}" data-category-id="${cat.id}">
                    <span>${cat.icon}</span>
                    <span>${cat.name}</span>
                </button>
            `;
        }).join('');

        // Attach category click listeners
        elements.categoryPills.querySelectorAll('.category-pill').forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentCategory = btn.getAttribute('data-category-id');
                playAudioFeedback('click');
                renderCategoryPills();
                renderProducts();
            });
        });
    }

    // ==========================================================================
    // RENDER PRODUCTS
    // ==========================================================================
    function renderProducts() {
        let items = MENU_DATA.items;

        // Filter by Brand
        if (state.currentBrand !== 'all') {
            items = items.filter(item => item.brand === state.currentBrand);
        }

        // Filter by Category
        if (state.currentCategory !== 'all') {
            items = items.filter(item => item.category === state.currentCategory);
        }

        // Filter by Search Query
        if (state.searchQuery.trim() !== '') {
            const q = state.searchQuery.toLowerCase().trim();
            items = items.filter(item => 
                item.name.toLowerCase().includes(q) || 
                item.description.toLowerCase().includes(q)
            );
        }

        if (items.length === 0) {
            elements.productsGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px; color: var(--text-muted);">
                    <div style="font-size: 3rem; margin-bottom: 12px;">🔍</div>
                    <h3 style="color: #fff; margin-bottom: 8px;">Nenhum item encontrado</h3>
                    <p>Tente buscar por outro termo ou limpar os filtros de categoria.</p>
                </div>
            `;
            return;
        }

        elements.productsGrid.innerHTML = items.map(item => {
            const brandLabel = item.brand === 'burguer' ? '🍔 Bibiany Burguer' : '🎂 Sabores da Bibiany';
            return `
                <div class="product-card" data-item-id="${item.id}">
                    <span class="product-brand-tag">${brandLabel}</span>
                    ${item.badge ? `<span class="product-badge-corner">${item.badge}</span>` : ''}
                    
                    <div class="product-image-box">
                        <img src="${item.image}" alt="${item.name}" loading="lazy" />
                    </div>

                    <div class="product-details">
                        <h4 class="product-title">${item.name}</h4>
                        <p class="product-desc">${item.description}</p>
                        
                        <div class="product-bottom-row">
                            <div class="product-price-kwanza">
                                ${new Intl.NumberFormat('pt-AO').format(item.price)}<span>Kz</span>
                            </div>
                            <button class="btn-add-item" data-action="open-modal" data-item-id="${item.id}">
                                <span>+</span> Adicionar
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Attach Add buttons
        elements.productsGrid.querySelectorAll('[data-action="open-modal"]').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const itemId = btn.getAttribute('data-item-id');
                openItemModal(itemId);
            });
        });
    }

    // ==========================================================================
    // ITEM MODAL (CUSTOMIZATION / NOTES)
    // ==========================================================================
    function openItemModal(itemId) {
        const item = MENU_DATA.items.find(i => i.id === itemId);
        if (!item) return;

        activeModalItem = item;
        elements.modalItemImg.src = item.image;
        elements.modalItemImg.alt = item.name;
        elements.modalItemTitle.textContent = item.name;
        elements.modalItemDesc.textContent = item.description;
        elements.modalItemPrice.textContent = formatKz(item.price);
        elements.modalItemNotes.value = '';

        elements.itemModalBackdrop.classList.add('active');
        playAudioFeedback('click');
    }

    function closeItemModal() {
        elements.itemModalBackdrop.classList.remove('active');
        activeModalItem = null;
    }

    elements.btnModalClose.addEventListener('click', closeItemModal);
    elements.itemModalBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.itemModalBackdrop) closeItemModal();
    });

    elements.btnModalConfirmAdd.addEventListener('click', () => {
        if (!activeModalItem) return;
        const notes = elements.modalItemNotes.value.trim();
        addToCart(activeModalItem, notes);
        closeItemModal();
    });

    // ==========================================================================
    // SHOPPING CART SYSTEM
    // ==========================================================================
    function addToCart(item, notes = '') {
        const existingIndex = state.cart.findIndex(i => i.id === item.id && i.notes === notes);

        if (existingIndex > -1) {
            state.cart[existingIndex].quantity += 1;
        } else {
            state.cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                image: item.image,
                quantity: 1,
                notes: notes,
                brand: item.brand
            });
        }

        saveCart();
        updateCartUI();
        playAudioFeedback('add');
        showCartDrawer();
    }

    function updateQuantity(index, delta) {
        if (state.cart[index]) {
            state.cart[index].quantity += delta;
            if (state.cart[index].quantity <= 0) {
                state.cart.splice(index, 1);
            }
            saveCart();
            updateCartUI();
            playAudioFeedback('click');
        }
    }

    function saveCart() {
        localStorage.setItem('bibiany_cart', JSON.stringify(state.cart));
    }

    function updateCartUI() {
        const totalItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
        elements.cartCounterBadge.textContent = totalItemsCount;

        // Subtotal
        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // Delivery Fee
        const selectedZone = MENU_DATA.deliveryZones.find(z => z.id === state.selectedZoneId) || MENU_DATA.deliveryZones[0];
        const fee = state.orderType === 'takeaway' ? 0 : selectedZone.fee;
        const total = subtotal + fee;

        elements.cartSubtotal.textContent = formatKz(subtotal);
        elements.cartDeliveryFee.textContent = state.orderType === 'takeaway' ? 'Grátis (0 Kz)' : formatKz(fee);
        elements.cartTotal.textContent = formatKz(total);

        // Mobile preview
        elements.mobileCartTotal.textContent = formatKz(total);
        if (totalItemsCount > 0) {
            elements.mobileBottomBar.classList.add('active');
            document.body.classList.add('has-cart-bar');
        } else {
            elements.mobileBottomBar.classList.remove('active');
            document.body.classList.remove('has-cart-bar');
        }

        // Cart items list render
        if (state.cart.length === 0) {
            elements.cartItemsList.innerHTML = `
                <div class="cart-empty-message">
                    <div class="cart-empty-icon">🛒</div>
                    <p style="font-weight: 700; color: #fff;">O seu carrinho está vazio</p>
                    <p style="font-size: 0.85rem; margin-top: 4px;">Explore o menu e adicione delícias de Bibiany!</p>
                </div>
            `;
            elements.btnCheckoutWhatsApp.disabled = true;
            elements.btnCheckoutWhatsApp.style.opacity = '0.5';
            elements.btnCheckoutWhatsApp.style.cursor = 'not-allowed';
            return;
        }

        elements.btnCheckoutWhatsApp.disabled = false;
        elements.btnCheckoutWhatsApp.style.opacity = '1';
        elements.btnCheckoutWhatsApp.style.cursor = 'pointer';

        elements.cartItemsList.innerHTML = state.cart.map((item, index) => `
            <div class="cart-item-card">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    ${item.notes ? `<div style="font-size: 0.75rem; color: var(--text-gold); margin-bottom: 2px;">Obs: ${item.notes}</div>` : ''}
                    <div class="cart-item-price">${formatKz(item.price * item.quantity)}</div>
                </div>
                <div class="cart-qty-controls">
                    <button class="btn-qty" data-action="dec" data-index="${index}">-</button>
                    <span class="qty-val">${item.quantity}</span>
                    <button class="btn-qty" data-action="inc" data-index="${index}">+</button>
                </div>
            </div>
        `).join('');

        // Attach quantity buttons
        elements.cartItemsList.querySelectorAll('.btn-qty').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'), 10);
                const action = btn.getAttribute('data-action');
                updateQuantity(index, action === 'inc' ? 1 : -1);
            });
        });
    }

    function showCartDrawer() {
        elements.cartBackdrop.classList.add('active');
        document.body.classList.add('cart-open');
        document.body.style.overflow = 'hidden';
    }

    function hideCartDrawer() {
        elements.cartBackdrop.classList.remove('active');
        document.body.classList.remove('cart-open');
        document.body.style.overflow = '';
    }

    // ==========================================================================
    // DELIVERY ZONE SELECTION & SYNC
    // ==========================================================================
    function populateZoneSelects() {
        const optionsHtml = MENU_DATA.deliveryZones.map(zone => `
            <option value="${zone.id}">${zone.name} - ${zone.fee === 0 ? 'Grátis' : formatKz(zone.fee)}</option>
        `).join('');

        elements.cartZoneSelect.innerHTML = optionsHtml;
        elements.pageZoneSelect.innerHTML = optionsHtml;

        elements.cartZoneSelect.value = state.selectedZoneId;
        elements.pageZoneSelect.value = state.selectedZoneId;
        updateZoneDisplay();
    }

    function updateZoneDisplay() {
        const zone = MENU_DATA.deliveryZones.find(z => z.id === state.selectedZoneId);
        if (zone) {
            elements.pageZoneFeeDisplay.textContent = zone.fee === 0 ? 'Grátis' : formatKz(zone.fee);
            elements.pageZoneTimeDisplay.textContent = zone.time;
        }
    }

    elements.pageZoneSelect.addEventListener('change', (e) => {
        state.selectedZoneId = e.target.value;
        elements.cartZoneSelect.value = state.selectedZoneId;
        updateZoneDisplay();
        updateCartUI();
    });

    elements.cartZoneSelect.addEventListener('change', (e) => {
        state.selectedZoneId = e.target.value;
        elements.pageZoneSelect.value = state.selectedZoneId;
        updateZoneDisplay();
        updateCartUI();
    });

    // Order type buttons (Delivery vs Take Away)
    elements.orderTypeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.orderTypeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.orderType = btn.getAttribute('data-type');
            
            const zoneWrapper = document.getElementById('cartZoneSelectWrapper');
            const addressWrapper = document.getElementById('cartAddressWrapper');
            
            if (state.orderType === 'takeaway') {
                if (zoneWrapper) zoneWrapper.style.display = 'none';
                if (addressWrapper) addressWrapper.style.display = 'none';
            } else {
                if (zoneWrapper) zoneWrapper.style.display = 'block';
                if (addressWrapper) addressWrapper.style.display = 'block';
            }
            
            updateCartUI();
            playAudioFeedback('click');
        });
    });

    // ==========================================================================
    // WHATSAPP ORDER GENERATOR
    // ==========================================================================
    const WHATSAPP_PHONE = '244923000000'; // Substituível pelo número do restaurante em Angola

    function handleCheckoutWhatsApp() {
        if (state.cart.length === 0) {
            alert('Seu carrinho está vazio. Adicione itens antes de enviar o pedido.');
            return;
        }

        const name = elements.customerNameInput.value.trim() || 'Cliente';
        const phone = elements.customerPhoneInput.value.trim() || 'Não informado';
        const address = elements.customerAddressInput.value.trim();
        const paymentMethod = elements.paymentMethodSelect ? elements.paymentMethodSelect.value : 'Multicaixa Express';
        const notes = elements.orderNotesInput.value.trim();

        if (state.orderType === 'delivery' && !address) {
            alert('Por favor, informe o seu endereço / rua de entrega no Lubango.');
            elements.customerAddressInput.focus();
            return;
        }

        const subtotal = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const selectedZone = MENU_DATA.deliveryZones.find(z => z.id === state.selectedZoneId) || MENU_DATA.deliveryZones[0];
        const fee = state.orderType === 'takeaway' ? 0 : selectedZone.fee;
        const total = subtotal + fee;

        // Código sequencial único e data formatada
        const orderCode = 'BB-' + Math.floor(1000 + Math.random() * 9000);
        const now = new Date();
        const dia = String(now.getDate()).padStart(2, '0');
        const mes = String(now.getMonth() + 1).padStart(2, '0');
        const ano = now.getFullYear();
        const horas = String(now.getHours()).padStart(2, '0');
        const minutos = String(now.getMinutes()).padStart(2, '0');
        const dataFormatada = `${dia}/${mes}/${ano} às ${horas}:${minutos}`;

        const divisor = '================================';

        let message = `*SOLICITAÇÃO DE PEDIDO ONLINE*\n`;
        message += `*BIBIANY BURGUER & SABORES*\n`;
        message += `_Lubango, Província da Huíla - Angola_\n`;
        message += `${divisor}\n\n`;

        message += `*DADOS DO PEDIDO*\n`;
        message += `- *Código:* #${orderCode}\n`;
        message += `- *Data/Hora:* ${dataFormatada}\n`;
        message += `- *Modalidade:* ${state.orderType === 'delivery' ? 'Entrega ao Domicílio (Delivery)' : 'Retirada no Balcão (Take Away)'}\n\n`;

        message += `*DADOS DO CLIENTE*\n`;
        message += `- *Nome:* ${name}\n`;
        message += `- *Telefone:* ${phone}\n`;

        if (state.orderType === 'delivery') {
            message += `- *Bairro/Zona:* ${selectedZone.name}\n`;
            message += `- *Endereço:* ${address}\n`;
        }

        message += `\n${divisor}\n`;
        message += `*ITENS DO PEDIDO:*\n`;

        state.cart.forEach((item, idx) => {
            const itemTotal = formatKz(item.price * item.quantity);
            message += `\n${idx + 1}. *${item.quantity}x ${item.name}*\n`;
            message += `   Preço Unitário: ${formatKz(item.price)}\n`;
            message += `   Subtotal: ${itemTotal}\n`;
            if (item.notes) {
                message += `   Obs: ${item.notes}\n`;
            }
        });

        message += `\n${divisor}\n`;
        message += `*RESUMO DA CONTA*\n`;
        message += `- Subtotal dos Itens: *${formatKz(subtotal)}*\n`;
        if (state.orderType === 'delivery') {
            message += `- Taxa de Entrega: *${fee === 0 ? 'Grátis' : formatKz(fee)}* (${selectedZone.name})\n`;
        } else {
            message += `- Taxa de Entrega: *Grátis (Take Away)*\n`;
        }
        message += `- *TOTAL A PAGAR: ${formatKz(total)}*\n`;
        message += `${divisor}\n\n`;

        message += `*PAGAMENTO & OBSERVAÇÕES*\n`;
        message += `- *Forma de Pagamento:* ${paymentMethod}\n`;
        if (notes) {
            message += `- *Observações:* ${notes}\n`;
        }

        message += `\n_Por favor, confirmem o recebimento do pedido e o tempo estimado para entrega/preparo._\n`;
        message += `_Muito obrigado pela preferência!_`;

        const encodedMsg = encodeURIComponent(message);
        const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
        window.open(waUrl, '_blank');
    }

    elements.btnCheckoutWhatsApp.addEventListener('click', handleCheckoutWhatsApp);

    // ==========================================================================
    // BRAND SWITCHER
    // ==========================================================================
    elements.brandButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            elements.brandButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            state.currentBrand = btn.getAttribute('data-brand');
            state.currentCategory = 'all';
            playAudioFeedback('click');
            renderCategoryPills();
            renderProducts();
        });
    });

    // ==========================================================================
    // SEARCH INPUT
    // ==========================================================================
    elements.searchInput.addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderProducts();
    });

    // Quick Combo Buttons on Page
    document.querySelectorAll('.btn-combo-order').forEach(btn => {
        btn.addEventListener('click', () => {
            const comboId = btn.getAttribute('data-combo-id');
            const comboItem = MENU_DATA.items.find(i => i.id === comboId);
            if (comboItem) {
                addToCart(comboItem);
            }
        });
    });

    // Open/Close Cart Triggers
    elements.btnOpenCart.addEventListener('click', showCartDrawer);
    elements.btnMobileOpenCart.addEventListener('click', showCartDrawer);
    elements.btnCloseCart.addEventListener('click', hideCartDrawer);
    elements.cartBackdrop.addEventListener('click', (e) => {
        if (e.target === elements.cartBackdrop) hideCartDrawer();
    });

    // Scroll Navbar Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.site-header');
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // INITIALIZATION
    populateZoneSelects();
    renderCategoryPills();
    renderProducts();
    updateCartUI();
});
