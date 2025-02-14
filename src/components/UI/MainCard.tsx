import React, { forwardRef, ReactNode, ReactElement } from "react";

// material-ui
import { SxProps, useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
} from "@mui/material";

// constant
const headerSX: { [key: string]: SxProps } = {
  "& .MuiCardHeader-action": { mr: 0 },
};

interface MainCardProps {
  elevation?: number;
  border?: boolean;
  boxShadow?: boolean;
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  contentSX?: { [key: string]: SxProps };
  darkTitle?: boolean;
  secondary?: ReactNode;
  shadow?: string;
  sx?: SxProps;
  title?: string | ReactElement;
}

// ==============================|| CUSTOM MAIN CARD ||============================== //

const MainCard = forwardRef<unknown, MainCardProps>(
  (
    {
      border = true,
      boxShadow,
      children,
      content = true,
      contentClass = "",
      contentSX = {},
      darkTitle,
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    },
    ref
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref as React.RefObject<HTMLDivElement>}
        {...others}
        sx={{
          border: border ? "1px solid" : "none",
          borderColor: theme.palette.primary["200"] + 25,
          ":hover": {
            boxShadow: boxShadow
              ? shadow || "0 2px 14px 0 rgb(32 40 45 / 8%)"
              : "inherit",
          },
          ...sx,
        }}
      >
        {/* card header and action */}
        {title && (
          <CardHeader
            sx={headerSX}
            title={
              darkTitle ? <Typography variant="h3">{title}</Typography> : title
            }
            action={secondary}
          />
        )}

        {/* content & header divider */}
        {title && <Divider />}

        {/* card content */}
        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

export default MainCard;
