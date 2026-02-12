import { CORE_FEATURES } from "./data";

export function CoreFeatures() {
  return (
    <section className="py-30 bg-[var(--token-gray-50)] dark:bg-[var(--token-white-1)] px-5">
      <div className="max-w-[72rem] mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-3 font-bold text-[var(--token-gray-800)] text-3xl dark:text-[var(--token-white-90)] md:text-title-lg max-w-xl mx-auto">
            Core Features of our Tools
          </h2>

          <p className="max-w-xl mx-auto leading-6 text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)]">
            Unlock the Potential of Innovation. Discover the Advanced AI Tools
            Transforming Your Ideas into Reality with Unmatched Precision and
            Intelligence.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
          {CORE_FEATURES.map((feature) => (
            <div
              key={feature.title}
              className="bg-[var(--token-white)] p-9 border border-[var(--token-gray-200)] dark:bg-[var(--token-white-5)] dark:border-[var(--token-white-3)] rounded-[20px] shadow-[0px_30px_50px_-32px_var(--color-shadow-core-feature)]"
            >
              <div className="core-feature-icon mb-9">
                <feature.Icon width={40} height={40} role="presentation" />
              </div>

              <h3 className="mb-4 text-[var(--token-gray-800)] dark:text-[var(--token-white-90)] font-bold text-xl md:text-2xl">
                {feature.title}
              </h3>
              <p className="text-[var(--token-gray-500)] dark:text-[var(--token-gray-400)]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
