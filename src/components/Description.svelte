<div class="my-16 text-xl font-gray-700 space-y-5">
    <p>

        Často je třeba zjistit <span data-tooltip="Zastoupení nemoci ve společnosti.">prevalenci</span> nějaké nemoci v
        populaci. Vyberme tedy reprezentativní vzorek populace a u
        každého
        zjistíme, zda je nemocen, pomocí nějakého testu. Test má <i>sensitivitu</i> a <i>specificitu</i> garantovanou
        výrobcem.
    </p>


    <ul class="list-disc list-inside">
        <li class="pl-4">
            <b>Sensitivita</b> je přesnost testu na nemocných. Pravděpodobnost, že skutečně nemocný člověk bude
            označen za
            nemocného.
        </li>
        <li class="pl-4">
            <b>Specificita</b> je přesnost testu na zdravých. Pravděpodobnost, že skutečně zdravý člověk bude
            označen za
            zdravého.
        </li>
    </ul>

    <p>
        V našem vzorku populace velikosti
        <span class="font-bold not-italic">N</span>
        bude
        <span class="font-bold not-italic text-red-700">A</span>
        lidí s pozitivním testem a
        <span class="font-bold not-italic text-blue-700">B</span>
        lidí s negativním testem, přičemž
        <span class="font-bold not-italic text-red-700">A</span> +
        <span class="font-bold not-italic text-blue-700">B</span> =
        <span class="font-bold not-italic">N</span>.
    </p>
    <p>
        Jak máme ale odhadnout prevalenci v celé populaci? Intuitivní možnost je odhadnout prevalenci prostě zlomem
        pozitivních v našem výběru prev ~ A/N. Tohle je ale rozumné jen výjimečně. Představte si například vzorek
        populace
        České republiky o rozsahu <span data-tooltip="Velikost vzorku populace."
                                        class="font-bold not-italic">N=1000</span>. Předpokládejme, že nemoc, jejíž
        prevalenci zkoumám, se v populaci vůbec
        nevyskytuje. Pokud ovšem použijeme test se
        <span data-tooltip="Přesnost testu na zdravých.">specificitou 90%</span>, dostaneme hodnoty
        <span data-tooltip="Počet osob s pozitivním testem." class="font-bold not-italic text-red-700">A=100</span> a
        <span data-tooltip="Počet osob s negativním testem." class="font-bold not-italic text-blue-700">B=900</span>.
        Použití <span data-tooltip="Podíl osob s positivním testem.">poměru A/N</span> dá
        zcela nesmyslný odhad prevalence ve výši 10%, ačkoliv skutečná prevalence je téměř nula.
    </p>
    <p>
        Je třeba odhadnout prevalenci správně,
        <a href="https://www.4bin.org/bayesovska-inference/" class="underline text-blue-500" target="_blank">to jest
            bayesovsky</a>.
        A právě k tomu slouží tato aplikace. Níže v rozhraní lze zadat
        <span data-tooltip="Přesnost testu na nemocných.">sensitivitu</span> a
        <span data-tooltip="Přesnost testu na zdravých.">specificitu</span> použitého testu, rozsah výběru a výsledek
        testování. Poté lze zadat pomocí
        <span data-tooltip="Pro přehlednost používáme nestandardní parametrizaci beta rozdělení. Viz link.">
        <a href="https://en.wikipedia.org/wiki/Beta_distribution#Mean_and_sample_size" class="text-blue-500"
           target="_blank">beta rozdělení</a>
            </span>
        apriorní představu o hledané prevalenci – tedy co si o zkoumané
        prevalenci myslím, než začnu měřit.
        Aplikace vyčíslí posteriorní rozdělení, vypíše jeho střední (očekávanou) hodnotu a spočte v jakém intervalu
        prevalence leží s 90% pravděpodobností.
    </p>

</div>

<svelte:head>
    <style>
        /*This would all go into the global.css file*/
        [data-tooltip] {
            position: relative;
            z-index: 2;

            /*display: block;*/
            font-style: italic;
            border-bottom: 3px dotted #000000;
            text-decoration: none;
        }

        [data-tooltip]:before,
        [data-tooltip]:after {
            font-style: normal;
            font-weight: normal;

            visibility: hidden;
            opacity: 0;
            pointer-events: none;
            transition: .2s ease-out;
            transform: translate(-50%, 5px)
        }

        [data-tooltip]:before {
            position: absolute;
            bottom: 100%;
            left: 50%;
            margin-bottom: 5px;
            padding: 7px;
            width: 100%;
            min-width: 200px;
            max-width: 300px;
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            background-color: #000;
            background-color: hsla(0, 0%, 20%, 0.9);
            color: #fff;
            content: attr(data-tooltip);
            text-align: center;
            font-size: 14px;
            line-height: 1.2;
            transition: .2s ease-out
        }

        [data-tooltip]:after {
            position: absolute;
            bottom: 100%;
            left: 50%;
            width: 0;
            border-top: 5px solid #000;
            border-top: 5px solid hsla(0, 0%, 20%, 0.9);
            border-right: 5px solid transparent;
            border-left: 5px solid transparent;
            content: " ";
            font-size: 0;
            line-height: 0;
        }

        [data-tooltip]:hover:before,
        [data-tooltip]:hover:after {
            visibility: visible;
            opacity: 1;
            transform: translate(-50%, 0)
        }

        [data-tooltip=false]:hover:before,
        [data-tooltip=false]:hover:after {
            visibility: hidden;
            opacity: 0;
        }
    </style>
</svelte:head>
