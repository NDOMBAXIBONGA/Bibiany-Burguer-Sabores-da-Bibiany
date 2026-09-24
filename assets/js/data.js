// Dados Oficiais do Cardápio - Bibiany Burguer & Sabores da Bibiany (Huíla, Angola)

const MENU_DATA = {
    brands: [
        { id: "all", name: "Todos os Itens", icon: "✨" },
        { id: "burguer", name: "Bibiany Burguer", icon: "🍔" },
        { id: "sabores", name: "Sabores da Bibiany", icon: "🎂" }
    ],
    categories: [
        { id: "all", name: "Tudo", brand: "all", icon: "🔥" },
        { id: "combos", name: "Combos Especiais", brand: "burguer", icon: "⭐" },
        { id: "burgers", name: "Hambúrgueres", brand: "burguer", icon: "🍔" },
        { id: "bolos", name: "Bolos de Aniversário", brand: "sabores", icon: "🎂" },
        { id: "salgados-doces", name: "Doces & Salgados", brand: "sabores", icon: "🍩" },
        { id: "porcoes", name: "Porções & Fritas", brand: "burguer", icon: "🍟" },
        { id: "frango", name: "Frango Crocante", brand: "burguer", icon: "🍗" },
        { id: "wraps", name: "Wraps", brand: "burguer", icon: "🌯" },
        { id: "hotdogs", name: "Hot Dogs", brand: "burguer", icon: "🌭" },
        { id: "bebidas", name: "Bebidas Geladas", brand: "burguer", icon: "🥤" },
        { id: "sobremesas", name: "Sobremesas", brand: "burguer", icon: "🧁" }
    ],
    deliveryZones: [
        { id: "takeaway", name: "Retirada no Local (Take Away)", fee: 0, time: "15-25 min" },
        { id: "lubango-centro", name: "Lubango - Centro / Comercial", fee: 500, time: "25-35 min" },
        { id: "mitcha-lucrecia", name: "Mitcha / Lucrécia", fee: 700, time: "30-40 min" },
        { id: "ferrovia-lage", name: "Ferrovia / Lage / Santo António", fee: 700, time: "30-45 min" },
        { id: "mapunda-nambambe", name: "Mapunda / Nambambe", fee: 800, time: "35-45 min" },
        { id: "joao-almeida", name: "João de Almeida / Hélder Neto", fee: 900, time: "35-50 min" },
        { id: "arredores-humpata", name: "Outros Bairros / Humpata (Sob Consulta)", fee: 1500, time: "45-60 min" }
    ],
    items: [
        // COMBOS ESPECIAIS (Bibiany Burguer)
        {
            id: "combo-1",
            brand: "burguer",
            category: "combos",
            name: "Combo 1",
            description: "Hambúrguer simples artesanal + Batata frita crocante + Refrigerante em lata gelado.",
            price: 4500,
            image: "assets/images/combo_1.jpg",
            badge: "Mais Popular",
            tag: "Economia Real"
        },
        {
            id: "combo-2",
            brand: "burguer",
            category: "combos",
            name: "Combo 2",
            description: "Cheeseburguer com queijo derretido abundante + Batata frita + Refrigerante em lata.",
            price: 5500,
            image: "assets/images/combo_meal.jpg",
            badge: "Favorito da Casa",
            tag: "Completo"
        },
        {
            id: "combo-3",
            brand: "burguer",
            category: "combos",
            name: "Combo 3 (Especial Huíla)",
            description: "Duplo Burguer suculento com dobro de carne e queijo + Batata frita + Refrigerante lata.",
            price: 7000,
            image: "assets/images/combo_meal.jpg",
            badge: "Super Destaque",
            tag: "Mega Sabor"
        },

        // HAMBÚRGUERES (Bibiany Burguer)
        {
            id: "burg-simples",
            brand: "burguer",
            category: "burgers",
            name: "Hambúrguer Simples",
            description: "Hambúrguer artesanal grelhado na brasa, molho da casa e pão brioche macio.",
            price: 2500,
            image: "assets/images/hero_burger.jpg",
            badge: "Clássico"
        },
        {
            id: "burg-cheese",
            brand: "burguer",
            category: "burgers",
            name: "Cheeseburguer",
            description: "Carne suculenta com generosa camada de queijo cheddar derretido e molho especial.",
            price: 3000,
            image: "assets/images/hero_burger.jpg",
            badge: "Top Vendas"
        },
        {
            id: "burg-bacon",
            brand: "burguer",
            category: "burgers",
            name: "Bacon Burguer",
            description: "Carne bovina selecionada, fatias crocantes de bacon premium, queijo e molho especial.",
            price: 3500,
            image: "assets/images/hero_burger.jpg",
            badge: "Crocante"
        },
        {
            id: "burg-duplo",
            brand: "burguer",
            category: "burgers",
            name: "Duplo Burguer",
            description: "Duas carnes artesanais grelhadas, tempero exclusivo Bibiany e pão tostado na manteiga.",
            price: 4500,
            image: "assets/images/hero_burger.jpg",
            badge: "Para Fomes Grandes"
        },
        {
            id: "burg-duplo-cheese",
            brand: "burguer",
            category: "burgers",
            name: "Duplo Cheeseburguer",
            description: "Duas carnes suculentas com dobro de queijo cheddar derretido em perfeita harmonia.",
            price: 5000,
            image: "assets/images/hero_burger.jpg",
            badge: "Queijo Duplo"
        },
        {
            id: "burg-especial-bibiany",
            brand: "burguer",
            category: "burgers",
            name: "Especial Bibiany",
            description: "Hambúrguer duplo, fatias de bacon, queijo, alface fresca, tomate, cebola e molho especial secreto.",
            price: 5500,
            image: "assets/images/hero_burger.jpg",
            badge: "O Campeão",
            tag: "Chef Special"
        },

        // BOLOS DE ANIVERSÁRIO (Sabores da Bibiany)
        {
            id: "bolo-mini",
            brand: "sabores",
            category: "bolos",
            name: "Mini Bolo de Aniversário",
            description: "Massa fofa, recheio cremoso com cobertura de ganache de chocolate e morangos frescos.",
            price: 10000,
            image: "assets/images/hero_cake.jpg",
            badge: "Ideal p/ 4-6 Pessoas"
        },
        {
            id: "bolo-medio",
            brand: "sabores",
            category: "bolos",
            name: "Bolo Médio de Aniversário",
            description: "Perfeito para celebrações em família, com drip de chocolate, creme artesanal e morangos.",
            price: 13000,
            image: "assets/images/hero_cake.jpg",
            badge: "Mais Pedido"
        },
        {
            id: "bolo-grande",
            brand: "sabores",
            category: "bolos",
            name: "Bolo Grande de Aniversário",
            description: "Bolo suntuoso de festa, camadas ricas de recheio, finalização refinada e frutas selecionadas.",
            price: 16500,
            image: "assets/images/hero_cake.jpg",
            badge: "Festa Completa"
        },
        {
            id: "bolo-quadrado",
            brand: "sabores",
            category: "bolos",
            name: "Bolo Quadrado de Aniversário",
            description: "Grande bolo retangular tradicional com cobertura premium de brigadeiro, trufas e morangos.",
            price: 25000,
            image: "assets/images/hero_cake.jpg",
            badge: "Mega Celebração"
        },

        // DOCES E SALGADOS (Sabores da Bibiany - Dúzias)
        {
            id: "doce-berlim",
            brand: "sabores",
            category: "salgados-doces",
            name: "Bola de Berlim (Dúzia)",
            description: "12 unidades de bolas de Berlim douradas, super macias e recheadas com creme pasteleiro de qualidade.",
            price: 8000,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },
        {
            id: "doce-argolas",
            brand: "sabores",
            category: "salgados-doces",
            name: "Argolas Açucaradas (Dúzia)",
            description: "12 deliciosas argolas artesanais fritas no ponto certo, fofinhas e polvilhadas com açúcar e canela.",
            price: 8000,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },
        {
            id: "salgado-rissois",
            brand: "sabores",
            category: "salgados-doces",
            name: "Rissóis Dourados (Dúzia)",
            description: "12 rissóis artesanais crocantes com recheio cremoso e bem temperado de camarão/carne.",
            price: 6000,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },
        {
            id: "salgado-pao-chorico",
            brand: "sabores",
            category: "salgados-doces",
            name: "Pãozinho de Chouriço (Dúzia)",
            description: "12 mini pãezinhos recheados com chouriço saboroso, assados na hora com massa leve.",
            price: 9000,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },
        {
            id: "salgado-merenda",
            brand: "sabores",
            category: "salgados-doces",
            name: "Merenda Especial (Dúzia)",
            description: "12 unidades de merendas folhadas e macias, com recheio rico de queijo, fiambre ou chocolate.",
            price: 12500,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },
        {
            id: "doce-canudos",
            brand: "sabores",
            category: "salgados-doces",
            name: "Canudos Recheados (Dúzia)",
            description: "12 canudos crocantes açucarados generosamente preenchidos com creme pasteleiro e doce de leite.",
            price: 12000,
            image: "assets/images/pastries_mix.jpg",
            badge: "Dúzia"
        },

        // PORÇÕES (Bibiany Burguer)
        {
            id: "porcao-batata-normal",
            brand: "burguer",
            category: "porcoes",
            name: "Batata Frita (Normal)",
            description: "Porção individual de batatas sequinhas, crocantes e douradas com sal no ponto.",
            price: 1500,
            image: "assets/images/combo_meal.jpg",
            badge: "Crocante"
        },
        {
            id: "porcao-batata-grande",
            brand: "burguer",
            category: "porcoes",
            name: "Batata Frita (Grande)",
            description: "Porção generosa para compartilhar de batatas fritas palito crocantes.",
            price: 2500,
            image: "assets/images/combo_meal.jpg",
            badge: "P/ Compartilhar"
        },
        {
            id: "porcao-batata-cheddar-bacon",
            brand: "burguer",
            category: "porcoes",
            name: "Batata com Cheddar e Bacon",
            description: "Batatas fritas cobertas com banho de queijo cheddar cremoso e pedacinhos crocantes de bacon.",
            price: 3500,
            image: "assets/images/combo_meal.jpg",
            badge: "Irresistível"
        },
        {
            id: "porcao-onion-rings",
            brand: "burguer",
            category: "porcoes",
            name: "Onion Rings",
            description: "Anéis de cebola selecionados empanados em massa crocante especial.",
            price: 2500,
            image: "assets/images/combo_meal.jpg",
            badge: "Empanado"
        },
        {
            id: "porcao-nuggets-6",
            brand: "burguer",
            category: "porcoes",
            name: "Nuggets de Frango (6 un.)",
            description: "6 nuggets empanados crocantes por fora e macios por dentro, acompanha molho.",
            price: 2500,
            image: "assets/images/combo_meal.jpg",
            badge: "6 Peças"
        },
        {
            id: "porcao-nuggets-12",
            brand: "burguer",
            category: "porcoes",
            name: "Nuggets de Frango (12 un.)",
            description: "12 nuggets dourados e crocantes com molho especial de acompanhamento.",
            price: 4000,
            image: "assets/images/combo_meal.jpg",
            badge: "12 Peças"
        },

        // FRANGO (Bibiany Burguer)
        {
            id: "frango-asas-6",
            brand: "burguer",
            category: "frango",
            name: "Asas de Frango (6 un.)",
            description: "Asas de frango temperadas com especiarias secretas e fritas até a crocância perfeita.",
            price: 2500,
            image: "assets/images/hero_burger.jpg",
            badge: "6 Unidades"
        },
        {
            id: "frango-asas-12",
            brand: "burguer",
            category: "frango",
            name: "Asas de Frango (12 un.)",
            description: "Porção de 12 asas de frango super crocantes e saborosas para dividir.",
            price: 4500,
            image: "assets/images/hero_burger.jpg",
            badge: "12 Unidades"
        },
        {
            id: "frango-crocante-6",
            brand: "burguer",
            category: "frango",
            name: "Frango Crocante (6 un.)",
            description: "Pedaços nobres de frango frito no melhor estilo crispy angolano.",
            price: 3000,
            image: "assets/images/hero_burger.jpg",
            badge: "Extra Crocante"
        },
        {
            id: "frango-crocante-12",
            brand: "burguer",
            category: "frango",
            name: "Frango Crocante (12 un.)",
            description: "Balde de 12 pedaços de frango crocante temperados e empanados artesanalmente.",
            price: 5000,
            image: "assets/images/hero_burger.jpg",
            badge: "Balde Família"
        },
        {
            id: "frango-tiras",
            brand: "burguer",
            category: "frango",
            name: "Tiras de Frango",
            description: "Tiras macias de peito de frango empanadas com crosta dourada e molho especial.",
            price: 3500,
            image: "assets/images/hero_burger.jpg",
            badge: "Tender Crispy"
        },

        // WRAPS (Bibiany Burguer)
        {
            id: "wrap-frango",
            brand: "burguer",
            category: "wraps",
            name: "Wrap de Frango",
            description: "Tortilha tostada recheada com tiras de frango suculento, alface fresca e molho suave.",
            price: 3000,
            image: "assets/images/hero_burger.jpg",
            badge: "Leve & Saboroso"
        },
        {
            id: "wrap-carne",
            brand: "burguer",
            category: "wraps",
            name: "Wrap de Carne",
            description: "Tortilha artesanal com tiras de carne grelhada bem temperada, queijo e vegetais.",
            price: 3500,
            image: "assets/images/hero_burger.jpg",
            badge: "Muito Recheio"
        },
        {
            id: "wrap-especial",
            brand: "burguer",
            category: "wraps",
            name: "Wrap Especial Bibiany",
            description: "Combinação nobre de carnes, bacon crocante, mix de queijos derretidos e molho do chef.",
            price: 4500,
            image: "assets/images/hero_burger.jpg",
            badge: "Top Wrap"
        },

        // HOT DOGS (Bibiany Burguer)
        {
            id: "dog-simples",
            brand: "burguer",
            category: "hotdogs",
            name: "Hot Dog Simples",
            description: "Pão fofinho, salsicha suculenta cozida, molhos tradicionais e batata palha.",
            price: 1500,
            image: "assets/images/hero_burger.jpg",
            badge: "Express"
        },
        {
            id: "dog-especial",
            brand: "burguer",
            category: "hotdogs",
            name: "Hot Dog Especial",
            description: "Salsicha grelhada, queijo derretido, milho, vinagrete da casa e molho especial Bibiany.",
            price: 2500,
            image: "assets/images/hero_burger.jpg",
            badge: "Especial"
        },
        {
            id: "dog-duplo",
            brand: "burguer",
            category: "hotdogs",
            name: "Hot Dog Duplo",
            description: "Duas salsichas, dobro de queijo, bacon em cubos, batata palha crocante e molhos especiais.",
            price: 3500,
            image: "assets/images/hero_burger.jpg",
            badge: "Monstro"
        },

        // BEBIDAS (Bibiany Burguer)
        {
            id: "bebida-lata",
            brand: "burguer",
            category: "bebidas",
            name: "Refrigerante em Lata (330ml)",
            description: "Coca-Cola, Fanta Laranja, Sprite ou Coca Zero bem gelada.",
            price: 800,
            image: "assets/images/combo_meal.jpg",
            badge: "Gelado"
        },
        {
            id: "bebida-1-5l",
            brand: "burguer",
            category: "bebidas",
            name: "Refrigerante 1.5L",
            description: "Garrafa grande de 1.5L perfeita para compartilhar com o seu pedido.",
            price: 1500,
            image: "assets/images/combo_meal.jpg",
            badge: "Família"
        },
        {
            id: "bebida-sumo",
            brand: "burguer",
            category: "bebidas",
            name: "Sumo Natural (Copo)",
            description: "Sumo feito na hora com frutas frescas locais (Laranja, Maracujá ou Manga).",
            price: 1500,
            image: "assets/images/combo_meal.jpg",
            badge: "100% Natural"
        },
        {
            id: "bebida-agua",
            brand: "burguer",
            category: "bebidas",
            name: "Água Mineral Fresca (500ml)",
            description: "Água mineral pura sem gás, natural ou fresca.",
            price: 500,
            image: "assets/images/combo_meal.jpg",
            badge: "Pura"
        },

        // SOBREMESAS (Bibiany Burguer)
        {
            id: "sob-petit-gateau",
            brand: "burguer",
            category: "sobremesas",
            name: "Petit Gateau com Sorvete",
            description: "Bolinho de chocolate com recheio cremoso e quente derretido, servido com bola de sorvete de baunilha.",
            price: 2500,
            image: "assets/images/hero_cake.jpg",
            badge: "Sobremesa Real"
        },
        {
            id: "sob-brownie",
            brand: "burguer",
            category: "sobremesas",
            name: "Brownie de Chocolate com Calda",
            description: "Pedaço farto de brownie molhadinho de puro cacau com nozes e calda quente de chocolate.",
            price: 2000,
            image: "assets/images/hero_cake.jpg",
            badge: "Delicioso"
        },
        {
            id: "sob-sorvete-2-bolas",
            brand: "burguer",
            category: "sobremesas",
            name: "Sorvete Artesanal (2 Bolas)",
            description: "Duas bolas generosas nos sabores baunilha, chocolate ou morango com calda doce.",
            price: 1500,
            image: "assets/images/hero_cake.jpg",
            badge: "Refrescante"
        }
    ]
};
