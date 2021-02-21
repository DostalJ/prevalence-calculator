<!-- Inspirace: https://tailwindui.com/components/application-ui/forms/form-layouts -->

<script>
    export let alpha;
    export let beta;
    export let sens;
    export let spec;
    export let nPos;
    export let nNeg;
    const onResetClick = () => void;
</script>

<div class="mt-10 sm:mt-0">

    <div class="mb-8">
        <div class="px-4 sm:px-0">
            <h3 class="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
            <p class="mt-1 text-sm text-gray-600">
                Use a permanent address where you can receive mail.
            </p>
        </div>
    </div>

    <div class="md:grid md:grid-cols-3 md:gap-6">

        <div class="mt-5 md:mt-0 md:col-span-2">
            <div class="shadow overflow-hidden sm:rounded-md">
                <div class="px-4 py-5 bg-white sm:p-6">
                    <div class="grid grid-cols-6 gap-6">

                        <div class="col-span-6">
                            <label for="alfa" class="block text-sm font-medium text-gray-700">Alfa</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="alfa" id="alfa"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md col-span-1"
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
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md col-span-1"
                                       min=1 max=100 step=1
                                       bind:value={beta}
                                >
                                <input type=range name="beta" id="beta-slider" class="col-span-2"
                                       min=1 max=100 step=1
                                       bind:value={beta}
                                >
                            </div>
                        </div>

                        <div class="hidden sm:block col-span-6" aria-hidden="true">
                            <div class="py-5">
                                <div class="border-t-4 border-gray-200"></div>
                            </div>
                        </div>

                        <div class="col-span-6">
                            <label for="sens" class="block text-sm font-medium text-gray-700">Sensitivita testu</label>
                            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <input type=number name="sens" id="sens"
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md col-span-1"
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
                                       class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md col-span-1"
                                       min=0.5 max=1 step=0.001
                                       bind:value={spec}

                                >
                                <input type=range name="spec" id="spec-slider" class="col-span-2"
                                       min=0.5 max=1 step=0.001
                                       bind:value={spec}

                                >
                            </div>
                        </div>

                        <div class="hidden sm:block col-span-6" aria-hidden="true">
                            <div class="py-5">
                                <div class="border-t-4 border-gray-200"></div>
                            </div>
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="positive" class="block text-sm font-medium text-gray-700">
                                Počet pozitivních testů
                            </label>
                            <input type="number" name="positive" id="positive"
                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                   min=0 step=10
                                   bind:value={nPos}
                            >
                        </div>

                        <div class="col-span-6 sm:col-span-3">
                            <label for="negatice" class="block text-sm font-medium text-gray-700">
                                Počet negativních testů
                            </label>
                            <input type="number" name="negatice" id="negatice"
                                   class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                   min=0 step=10
                                   bind:value={nNeg}
                            >
                        </div>
                    </div>
                </div>

                <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                    <button type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            on:click={onResetClick()}
                    >
                        Reset
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>