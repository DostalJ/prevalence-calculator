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

    const xx = linspace(0.00001, 0.99999, 500);
    // console.log(xx)
    $: prior_yy_unnorm = xx.map(x => log_prior(x, alpha, beta)).map(exp)
    $: prior_yy = prior_yy_unnorm.map(x => x / Sum(prior_yy_unnorm))


    $: log_yy = xx.map(x => log_posterior(x, sens, spec, nNeg, nPos, alpha, beta))

    $: yy_unnorm = log_yy.map((x) => exp(x))
    $: yy = yy_unnorm.map(x => x / Sum(yy_unnorm))
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

    <div class="grid grid-cols-1 md:grid-cols-2 gap-20 mb-64">
        <div>
            <ParametersInput
                    bind:alpha={alpha} bind:beta={beta}
                    bind:sens={sens} bind:spec={spec}
                    bind:nPos={nPos} bind:nNeg={nNeg}
                    onResetClick={resetParameters}
            />
        </div>
        <div>
            <p class="text-red-600 text-2xl">{ExpectedValue(xx, yy)}</p>

            <!--    <DistributionPlot points={prior_points}/>-->
            <DistributionPlot points={points}/>
        </div>
    </div>


    <!--    <label>-->
    <!--        <p>Alfa</p>-->
    <!--        <input type=number bind:value={alpha} min=0 max=100 step=1>-->
    <!--        <input type=range bind:value={alpha} min=0 max=100 step=1>-->
    <!--    </label>-->

    <!--    <label>-->
    <!--        <p>Beta</p>-->
    <!--        <input type=number bind:value={beta} min=0 max=100 step=1>-->
    <!--        <input type=range bind:value={beta} min=0 max=100 step=1>-->
    <!--    </label>-->

    <!--    <p>Pocet positivnich testu</p>-->
    <!--    <input id="input-n-pos" type=number bind:value={nPos} min=0 step=10>-->
    <!--    <p>Pocet negativnich testu</p>-->
    <!--    <input id="input-n-neg" type=number bind:value={nNeg} min=0 step=10>-->

    <!--    <label>-->
    <!--        <p>Sensitivita testu</p>-->
    <!--        <input type=number bind:value={sens} min=0 max=1 step=0.001>-->
    <!--        <input type=range bind:value={sens} min=0 max=1 step=0.001>-->
    <!--    </label>-->

    <!--    <label>-->
    <!--        <p>Specificita testu</p>-->
    <!--        <input type=number bind:value={spec} min=0 max=1 step=0.001>-->
    <!--        <input type=range bind:value={spec} min=0 max=1 step=0.001>-->
    <!--    </label>-->


</div>
