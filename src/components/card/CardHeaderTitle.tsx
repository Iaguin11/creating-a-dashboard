
interface CardHeaderTitleProps {
  title: string,
  className?: string
}

export default function CardHeaderTitle({ title, className }: CardHeaderTitleProps) {
  return (
    <span className={className ? className : `text-sm font-medium`}>
      {title}
    </span>
  )
}