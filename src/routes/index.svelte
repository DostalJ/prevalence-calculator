<script>
    let sens = 0.99;
    let spec = 0.99;
    let n_pos_tests = 10
    let n_neg_tests = 10

</script>

<svelte:head>
    <title>Kalkulačka prevalence</title>
</svelte:head>


<h1 class="text-5xl text-center mb-16">Kalkulačka prevalence</h1>


<div class="my-3">
    <p>Pocet positivnich testu</p>
    <input id="input-n-pos" type=number bind:value={n_pos_tests} min=0 step=10>
    <p>Pocet negativnich testu</p>
    <input id="input-n-neg" type=number bind:value={n_neg_tests} min=0 step=10>

    <p>Sensitivita testu</p>
    <input id="input-sens" type=number bind:value={sens} min=0 max=1 step=0.001>
    <p>Specificita testu</p>
    <input id="input-spec" type=number bind:value={spec} min=0 max=1 step=0.001>
</div>
