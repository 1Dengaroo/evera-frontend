import { IoArrowForwardSharp } from 'react-icons/io5'

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
}

export const InteractiveLink = ({
  href,
  children,
  onClick,
  ...props
}: InteractiveLinkProps) => {
  return (
    <a
      className="flex gap-x-1 items-center group text-blue-500 text-sm"
      href={href}
      onClick={onClick}
      rel="noopener noreferrer"
      target="_blank"
      {...props}
    >
      <p className="text-ui-fg-interactive">{children}</p>
      <IoArrowForwardSharp
        className="group-hover:-rotate-45 ease-in-out duration-150"
        color="var(--fg-interactive)"
      />
    </a>
  )
}
