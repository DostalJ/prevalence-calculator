<div class="w-4/5 mx-auto my-16 text-xl font-gray-700 space-y-5 text-justify">
    <p>

        Často je třeba zjistit prevalenci nějaké nemoci v populaci. Vyberme tedy reprezentativní vzorek populace a u
        každého
        zjistíme, zda je nemocen, pomocí nějakého testu. Test má <i>sensitivitu</i> a <i>specificitu</i> garantovanou
        výrobcem.
    </p>


    <ul class="list-disc list-inside">
        <li class="pl-4">
            <b>Sensitivita</b> je přesnost testu na nemocných, tedy pravděpodobnost, že skutečně nemocný člověk bude
            označen za
            nemocného.
        </li>
        <li class="pl-4">
            <b>Specificita</b> je přesnost testu na zdravých, tedy pravděpodobnost, že skutečně zdravý člověk bude
            označen za
            zdravého.
        </li>
    </ul>

    <p>
        V našem vzorku populace velikosti N bude A lidí s pozitivním testem a B lidí s negativním testem, přičemž A+B=N.
    </p>
    <p>
        Jak máme ale odhadnout prevalenci v celé populaci? Intuitivní možnost je odhadnout prevalenci prostě zlomem
        pozitivních v našem výběru prev ~ A/N. Tohle je ale rozumné jen výjimečně. Představte si například vzorek
        populace
        České republiky o rozsahu N=1000. Předpokládejme, že nemoc, jejíž prevalenci zkoumám, se v populaci vůbec
        nevyskytuje. Pokud ovšem použijeme test se specificitou 90%, dostaneme hodnoty A=100 a B=900. Použití poměru A/N
        dá
        zcela nesmyslný odhad prevalence ve výši 10%, ačkoliv skutečná prevalence je téměř nula.
    </p>
    <p>
        Je třeba odhadnout prevalenci správně, to jest bayesovsky. A právě k tomu slouží tato aplikace. Níže v rozhraní
        lze
        zadat sensitivitu a specificitu použitého testu, rozsah výběru a výsledek testování. Poté lze zadat pomocí beta
        rozdělení apriorní představu o hledané prevalenci – tedy co si o zkoumané prevalenci myslím, než začnu měřit.
        Aplikace vyčíslí posteriorní rozdělení, vypíše jeho střední (očekávanou) hodnotu a spočte v jakém intervalu
        prevalence leží s 90% pravděpodobností.
    </p>

</div>
