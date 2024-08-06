interface ContentHeaderDescriptionProps {
  description: string,
}

export function ContentHeaderDescription({ description }: ContentHeaderDescriptionProps) {
  return (
    <h1 className="text-sm">
      {description}
    </h1>
  )
}