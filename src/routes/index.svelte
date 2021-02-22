<script>
    import DistributionPlot from '../components/DistributionPlot.svelte';
    import ParametersInput from '../components/ParametersInput.svelte';
    import logpdf from '@stdlib/stats/base/dists/beta/logpdf'
    import ln from '@stdlib/math/base/special/ln'
    import exp from '@stdlib/math/base/special/exp'
    import linspace from '@stdlib/math/utils/linspace'

    const Sum = arr => arr.reduce((a, b) => a + b, 0)
    const ExpectedValue = (arrValues, arrProbs) => {
        let expVal = 0;
        for (let i = 0; i < arrValues.length; i++) {
            expVal = expVal + arrValues[i] * arrProbs[i];
        }
        return expVal
    }
    const Quantile = (arrValues, arrProbs, quantile) => {
        // https://stackoverflow.com/a/44081700/7662538
        const cdf = arrProbs.reduce((a, x, i) => [...a, x + (a[i - 1] || 0)], [])
        // console.log('yy_cumsum', cdf)
        for (let i in cdf) {
            if (cdf[i] >= quantile) return arrValues[i]
        }
        return NaN
    }

    const initialValues = {
        alpha: 1,
        beta: 10,
        sens: 0.99,
        spec: 0.99,
        nPos: 10,
        nNeg: 10,
    }


    // Prior
    let alpha = initialValues.alpha
    let beta = initialValues.beta

    // Data
    let sens = initialValues.sens
    let spec = initialValues.spec
    let nPos = initialValues.nPos  // Number of positive tests.
    let nNeg = initialValues.nNeg  // Number of negative tests.

    function resetParameters() {
        alpha = initialValues.alpha
        beta = initialValues.beta
        sens = initialValues.sens
        spec = initialValues.spec
        nPos = initialValues.nPos  // Number of positive tests.
        nNeg = initialValues.nNeg  // Number of negative tests.
    }


    const log_prior = (x, a, b) => logpdf(x, a, b)
    const theta_pos = (x, sens, spec) => x * sens + (1 - x) * (1 - spec)
    const theta_neg = (x, sens, spec) => x * (1 - sens) + (1 - x) * spec
    const log_likelihood = (x, sens, spec, nPos, nNeg) => ln(theta_pos(x, sens, spec)) * nPos + ln(theta_neg(x, sens, spec)) * nNeg
    const log_posterior = (x, sens, spec, nPos, nNeg, a, b) => log_prior(x, a, b) + log_likelihood(x, sens, spec, nPos, nNeg)

    const xx = linspace(0.00001, 0.99999, 200);
    // console.log(xx)
    $: prior_yy_unnorm = xx.map(x => log_prior(x, alpha, beta)).map(exp)
    $: prior_yy = prior_yy_unnorm.map(x => x / Sum(prior_yy_unnorm))


    $: log_yy = xx.map(x => log_posterior(x, sens, spec, nPos, nNeg, alpha, beta))

    // Odecet maxima je maly trik, abychom zvladli upocitat i mala cisla. Vysledek by to ovlivnit nemelo.
    $: yy_unnorm = log_yy.map((x) => exp(x - Math.max(...log_yy)))
    $: yy = yy_unnorm.map(x => x / Sum(yy_unnorm))
    $: expected_value = ExpectedValue(xx, yy)
    $: q10 = Quantile(xx, yy, 0.1)
    $: q90 = Quantile(xx, yy, 0.9)

    // $: {
    //     console.log('log_post', xx.map(x => log_posterior(x, sens, spec, nNeg, nPos, alpha, beta)))
    //     console.log('xx', xx)
    //     console.log('log_yy', log_yy)
    //     console.log('yy_unnorm', yy_unnorm)
    //     console.log('yy', yy)
    // }

    $: prior_points = xx.map((x, i) => ({x: x, y: prior_yy[i]}))
    $: points = xx.map((x, i) => ({x: x, y: yy[i]}))


</script>

<svelte:head>
    <title>Kalkulačka prevalence</title>
</svelte:head>


<h1 class="text-5xl text-center mb-16">Kalkulačka prevalence</h1>


<div class="my-3">

    <div class="grid grid-cols-1 md:grid-cols-5 gap:5 xl:gap-20 mb-64">
        <div class="col-span-2 mb-20">
            <div class="mb-8">
                <div class="px-4 sm:px-0 w-2/3 mr-auto ml-0">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Parametry výpočtu</h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Zadejte vaši dosavadní znalost prevalence, parametry testů a naměřené údaje.
                    </p>
                </div>
            </div>

            <ParametersInput
                    bind:alpha={alpha} bind:beta={beta}
                    bind:sens={sens} bind:spec={spec}
                    bind:nPos={nPos} bind:nNeg={nNeg}
                    onResetClick={resetParameters}
            />
        </div>
        <div class="col-span-3 items-center">
            <div class="mb-8 text-right">
                <div class="px-4 sm:px-0 w-1/2 mr-0 ml-auto">
                    <h2 class="text-lg font-medium leading-6 text-gray-900">Výsledky výpočtu</h2>
                    <p class="mt-1 text-sm text-gray-600">
                        Výsledky výpočtu prevalence. Odhad prevalence, 90 % interval odhadu a graf posteriorní
                        distribuce odhadu.
                    </p>
                </div>
            </div>

            <div class="max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
                <div class="flex flex-col lg:flex-row justify-center w-full lg:space-x-5 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                    <div class="w-full lg:w-1/4">
                        <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 shadow">
                            <div class="flex flex-row items-center justify-between">
                                <div class="flex flex-col">
                                    <div class="text-gray-500">
                                        Prevalence
                                    </div>
                                    <div class="text-xl font-extrabold">
                                        {(expected_value * 100).toFixed(1)} %
                                    </div>
                                </div>
                                <svg class="stroke-current text-gray-500" fill="none" height="24"
                                     stroke="currentColor"
                                     stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                     viewbox="0 0 24 24" width="24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12">
                                    </polyline>
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="w-full lg:w-1/2">
                        <div class="widget w-full p-4 rounded-lg bg-white border border-gray-100 shadow">
                            <div class="flex flex-row items-center justify-between">
                                <div class="flex flex-col">
                                    <div class="text-gray-500">
                                        Odhad nejistoty (90% HPD)
                                    </div>
                                    <div class="text-xl font-medium">
                                        {(q10 * 100).toFixed(1)} — {(q90 * 100).toFixed(1)} %
                                    </div>
                                </div>
                                <svg class="stroke-current text-gray-500" fill="none" stroke="currentColor"
                                     viewBox="0 0 24 24" height="24" width="24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <!--    <DistributionPlot points={prior_points}/>-->
            <DistributionPlot points={points}/>
        </div>
    </div>

</div>
