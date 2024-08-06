interface ContentHeaderTitleProps {
  title: string,
}

export function ContentHeaderTitle({ title }: ContentHeaderTitleProps) {
  return (
    <h1 className="text-4xl font-extrabold">
      {title}
    </h1>
  )
}