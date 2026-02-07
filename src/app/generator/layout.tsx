import GeneratorWrapper from '@/components/generator/generator-wrapper';

const GeneratorLayout = (
  {
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>,
) => {
  return <GeneratorWrapper>{children}</GeneratorWrapper>;
};

export default GeneratorLayout;
