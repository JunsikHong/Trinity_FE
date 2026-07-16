const AirplaneSection = () => {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="flex items-center justify-between border-b px-6 py-4">

                <div>

                    <h2 className="text-lg font-semibold">
                        Airplanes
                    </h2>

                    <p className="text-sm text-slate-500">
                        Manage airplanes
                    </p>

                </div>

                <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
                    New
                </button>

            </div>

            <div className="grid grid-cols-12">

                <div className="col-span-5 border-r">

                    <button className="w-full border-b px-5 py-4 text-left hover:bg-slate-50">

                        <div className="font-medium">
                            HL8234
                        </div>

                        <div className="text-xs text-slate-500">
                            Boeing 737-800
                        </div>

                    </button>

                </div>

                <div className="col-span-7 p-6 space-y-5">

                    <h3 className="font-semibold">
                        Edit Airplane
                    </h3>

                    <div>

                        <label className="mb-1 block text-sm">
                            Name
                        </label>

                        <input
                            className="h-10 w-full rounded-lg border px-3"
                            placeholder="HL8234"
                        />

                    </div>

                    <button className="rounded-lg bg-blue-600 px-5 py-2 text-white">
                        Save
                    </button>

                </div>

            </div>

        </div>
    );
}

export default AirplaneSection;