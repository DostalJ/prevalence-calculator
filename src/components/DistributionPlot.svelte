<script>
    export let points = [];

    import {scaleLinear} from 'd3-scale';

    const xTicks = [0, 0.25, 0.5, 0.75, 1];
    const padding = {top: 20, right: 15, bottom: 20, left: 25};

    let width = 500;
    let height = 200;

    const minX = 0;
    const maxX = 1;
    const minY = 0;
    $: maxY = Math.max.apply(Math, points.map(p => p.y)) * 1.1;

    $: xScale = scaleLinear()
        .domain([minX, maxX])
        .range([padding.left, width - padding.right]);

    $: yScale = scaleLinear()
        .domain([minY, maxY])
        .range([height - padding.bottom, padding.top]);


    $: path = `M${points.map(p => `${xScale(p.x)},${yScale(p.y)}`).join('L')}`;
    $: area = `${path}L${xScale(maxX)},${yScale(0)}L${xScale(minX)},${yScale(0)}Z`;

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
                    <text y="-4" x="-20">{(tick * 100).toFixed(2)} %</text>
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
        </g>

        <!-- data -->
        <path class="path-area" d={area}></path>
        <path class="path-line" d={path}></path>
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

    .tick text {
        fill: #666;
        text-anchor: start;
    }

    .tick.tick-0 line {
        stroke-dasharray: 0;
    }

    .x-axis .tick text {
        text-anchor: middle;
    }

    .path-line {
        fill: none;
        stroke: rgb(0, 100, 100);
        stroke-linejoin: round;
        stroke-linecap: round;
        stroke-width: 2;
    }

    .path-area {
        fill: rgba(0, 100, 100, 0.2);
    }
</style>