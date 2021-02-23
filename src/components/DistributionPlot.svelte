<script>
    export let points = [];
    export let prior_points = [];

    import {scaleLinear} from 'd3-scale';

    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    const padding = {top: 20, right: 15, bottom: 20, left: 25};

    let width = 500;
    let height = 200;

    const minX = 0;
    const maxX = 1;
    const minY = 0;
    $: maxY = Math.max.apply(Math, [...points, ...prior_points].map(p => p.y)) * 1.1;

    $: xScale = scaleLinear()
        .domain([minX, maxX])
        .range([padding.left, width - padding.right]);

    $: yScale = scaleLinear()
        .domain([minY, maxY])
        .range([height - padding.bottom, padding.top]);


    $: path = `M${points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
    $: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

    $: prior_path = `M${prior_points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
    $: prior_area = `${prior_path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

    const legendSize = 14;

    function formatMobile(tick) {
        return "'" + tick.toString().slice(-2);
    }


</script>


<div class="chart p-10" bind:clientWidth={width} bind:clientHeight={height}>
    <svg>
        <!-- y axis -->
        <g class="axis y-axis" transform="translate(0, {padding.top})">
            {#each yScale.ticks(5) as tick}
                <g class="tick tick-{tick}" transform="translate(0, {yScale(tick) - padding.bottom})">
                    <line x1="-4" x2="{width}" y1="0" y2="0"></line>
                    <text y="-4" x="-25">{(tick * 100).toFixed(1)} %</text>
                </g>
            {/each}
        </g>

        <!-- x axis -->
        <g class="axis x-axis">
            {#each xTicks as tick}
                <g class="tick tick-{ tick }" transform="translate({xScale(tick)},{height})">
                    <line y1="-{height}" y2="-{padding.bottom}" x1="0" x2="0"></line>
                    <text y="-2">{(tick * 100).toFixed(0)} %</text>
                </g>
            {/each}
            <g class="axis-label"
               transform="translate({(width - padding.left - padding.right) / 2},{height+padding.bottom})">
                <text>Prevalence</text>
            </g>
        </g>

        <!-- data -->
        <path class="path-area prior" d={prior_area}></path>
        <path class="path-line prior" d={prior_path}></path>
        <path class="path-area" d={area}></path>
        <path class="path-line" d={path}></path>

        <!-- Legend -->
        <g transform="translate({padding.left},{0})">
            <g>
                <rect y="0" x="0" width={legendSize} height={legendSize} fill="rgba(100, 38, 99, 0.5)"></rect>
                <text y={legendSize/2} x={1.5*legendSize} style="alignment-baseline: middle">Prior</text>
            </g>
            <g>
                <rect y="0" x="100" width={legendSize} height={legendSize} fill="rgb(0, 100, 100)"></rect>
                <text y={legendSize/2} x={100+1.5*legendSize} style="alignment-baseline: middle">Posterior</text>
            </g>
        </g>

    </svg>
</div>


<style>
    .chart {
        width: 90%;
        /*max-width: 500px;*/
        margin-left: auto;
        margin-right: auto;
    }

    svg {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: visible;
    }

    .tick {
        font-size: 1em;
        font-weight: 200;
    }

    .tick line {
        stroke: #aaa;
        stroke-dasharray: 2;
    }

    text {
        fill: #666;
        text-anchor: start;
    }

    .tick.tick-0 line {
        stroke-dasharray: 0;
    }

    .x-axis .tick text {
        text-anchor: middle;
    }

    .axis-label text {
        font-size: 1.2em;
        font-weight: 300;
    }

    .path-line {
        fill: none;
        stroke: rgb(0, 100, 100);
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
    }

    .path-area {
        fill: rgba(0, 100, 100, 0.4);
    }

    .prior.path-line {
        stroke: rgba(100, 38, 99, 0.2);
    }

    .prior.path-area {
        fill: rgba(100, 38, 99, 0.1);
    }
</style>