<!-- Inspirace: https://tailwindui.com/components/application-ui/forms/form-layouts -->

<script>
    export let alpha;
    export let beta;
    export let sens;
    export let spec;
    export let nPos;
    export let nNeg;
    export let onResetClick;
    export let alfaBetaParametrization = false;

    let mu = 0.2;
    let nu = 10;
    $: if (!alfaBetaParametrization) {
        alpha = mu * nu
        beta = (1 - mu) * nu
    }


</script>

<!--<div class="mt-10 sm:mt-0">-->
<div>
    <div class="mt-5 md:mt-0">
        <div class="shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 bg-white sm:p-6">
                <div class="grid grid-cols-6 gap-1">

                    <!--                    <div class="col-span-6" aria-hidden="true">-->
                    <!--                        <div class="pb-5">-->
                    <!--                            <div class="tile-with-horizontal border-b-2 text-center">-->
                    <!--                                <h3 class="text-center text-gray-500">Apriorní představa o prevalenci</h3>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="col-span-6" aria-hidden="true">
                        <div class="">
                            <h3 class="text-center text-gray-500 text-lg ">Apriorní představa o prevalenci</h3>
                        </div>
                    </div>

                    {#if alfaBetaParametrization}
                        <div class="col-span-6">
                            <label for="alfa" class="block text-sm font-medium text-gray-700">Alfa</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="alfa" id="alfa"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                       min=1 max=100 step=1
                                       bind:value={alpha}
                                >
                                <input type=range name="alfa" id="alfa-slider" class="col-span-2"
                                       min=1 max=100 step=1
                                       bind:value={alpha}
                                >
                            </div>
                        </div>

                        <div class="col-span-6">
                            <label for="beta" class="block text-sm font-medium text-gray-700">Beta</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="beta" id="beta"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                       min=1 max=100 step=1
                                       bind:value={beta}
                                >
                                <input type=range name="beta" id="beta-slider" class="col-span-2"
                                       min=1 max=100 step=1
                                       bind:value={beta}
                                >
                            </div>
                        </div>
                    {:else}
                        <div class="col-span-6">
                            <label for="alfa" class="block text-sm font-medium text-gray-700">Průměr apriorního
                                odhadu</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="mu" id="mu"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                       min=0.01 max=0.99 step=0.01
                                       bind:value={mu}
                                >
                                <input type=range name="mu" id="mu-slider" class="col-span-2"
                                       min=0.01 max=0.99 step=0.01
                                       bind:value={mu}
                                >
                            </div>
                        </div>

                        <div class="col-span-6">
                            <label for="beta" class="block text-sm font-medium text-gray-700">Jistota apriotního
                                odhadu</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="nu" id="nu"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                       min=2 max=100 step=1
                                       bind:value={nu}
                                >
                                <input type=range name="nu" id="nu-slider" class="col-span-2"
                                       min=2 max=100 step=1
                                       bind:value={nu}
                                >
                            </div>
                        </div>
                    {/if}

                    <!--                    <div class="col-span-6" aria-hidden="true">-->
                    <!--                        <div class="pb-5">-->
                    <!--                            <div class="tile-with-horizontal border-b-2 text-center">-->
                    <!--                                <h3 class="text-center text-gray-500">Parametry použitého testu</h3>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="col-span-6" aria-hidden="true">
                        <div class="pt-8">
                            <h3 class="text-center text-gray-500 text-lg ">Parametry použitého testu</h3>
                        </div>
                    </div>

                    <div class="col-span-6">
                        <label for="sens" class="block text-sm font-medium text-gray-700">Sensitivita testu</label>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type=number name="sens" id="sens"
                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                   min=0.5 max=1 step=0.001
                                   bind:value={sens}

                            >
                            <input type=range name="sens" id="sens-slider" class="col-span-2"
                                   min=0.5 max=1 step=0.001
                                   bind:value={sens}
                            >
                        </div>
                    </div>

                    <div class="col-span-6">
                        <label for="spec" class="block text-sm font-medium text-gray-700">Specificita testu</label>
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <input type=number name="spec" id="spec"
                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-lg col-span-1"
                                   min=0.5 max=1 step=0.001
                                   bind:value={spec}

                            >
                            <input type=range name="spec" id="spec-slider" class="col-span-2"
                                   min=0.5 max=1 step=0.001
                                   bind:value={spec}
                            >
                        </div>
                    </div>

                    <!--                    <div class="col-span-6" aria-hidden="true">-->
                    <!--                        <div class="pb-5">-->
                    <!--                            <div class="tile-with-horizontal border-b-2 text-center">-->
                    <!--                                <h3 class="text-center text-gray-500">Výsledky testování</h3>-->
                    <!--                            </div>-->
                    <!--                        </div>-->
                    <!--                    </div>-->
                    <div class="col-span-6" aria-hidden="true">
                        <div class="pt-8">
                            <h3 class="text-center text-gray-500 text-lg ">Výsledky testování</h3>
                        </div>
                    </div>


                    <div class="col-span-6 sm:col-span-3">
                        <label for="positive" class="block text-sm font-medium text-gray-700">
                            Počet pozitivních testů
                        </label>
                        <input type="number" name="positive" id="positive"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                               min=0 step=10
                               bind:value={nPos}
                        >
                    </div>

                    <div class="col-span-6 sm:col-span-3">
                        <label for="negatice" class="block text-sm font-medium text-gray-700">
                            Počet negativních testů
                        </label>
                        <input type="number" name="negatice" id="negatice"
                               class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-lg"
                               min=0 step=10
                               bind:value={nNeg}
                        >
                    </div>
                </div>
            </div>

            <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <button type="submit"
                        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        on:click={() => {mu=0.2; nu=10; onResetClick()}}
                >
                    Původní hodnoty
                </button>
            </div>
        </div>
    </div>
</div>


<!--<style>-->
<!--    .tile-with-horizontal {-->
<!--        @border-b-2;-->
<!--        @border-gray-200;-->
<!--        @text-center;-->
<!--        /*border-bottom: 2px solid #808080;*/-->
<!--        /*text-align: center;*/-->
<!--    }-->

<!--    .tile-with-horizontal h3 {-->
<!--        overflow: hidden;-->
<!--        position: relative;-->
<!--        display: inline-block;-->
<!--        white-space: nowrap;-->

<!--        max-width: 80%;-->

<!--        line-height: 24px;-->
<!--        bottom: -16px;-->
<!--        font-size: 18px;-->

<!--        border: solid #fff;-->
<!--        border-width: 0 20px;-->

<!--        background: #fff;-->
<!--    }-->
<!--</style>-->