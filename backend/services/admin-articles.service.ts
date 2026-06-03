import { prisma } from "@backend/database/client";
import { notificationsService } from "./notifications.service";

const _getPendingArticlesQuery = () => prisma.article.findMany({
  where: { status: "PENDING" },
  include: { author: { select: { name: true, email: true } } },
  orderBy: { createdAt: "asc" },
});

export type PendingArticle = Awaited<ReturnType<typeof _getPendingArticlesQuery>>[number];

export const adminArticlesService = {
  getPendingArticles: _getPendingArticlesQuery,

  async approveArticle(id: string, reviewerId: string) {
    const article = await prisma.article.update({
      where: { id },
      data: {
        status: "APPROVED",
        reviewerId,
        reviewDate: new Date(),
      },
    });

    await notificationsService.createNotification({
      userId: article.authorId,
      title: "Article Approved",
      message: `Your article "${article.title}" has been approved!`,
      type: "success",
    });

    return article;
  },

  async rejectArticle(id: string, reviewerId: string, reason: string) {
    const article = await prisma.article.update({
      where: { id },
      data: {
        status: "REJECTED",
        reviewerId,
        reviewDate: new Date(),
        rejectionReason: reason,
      },
    });

    await notificationsService.createNotification({
      userId: article.authorId,
      title: "Article Needs Revision",
      message: `Your article "${article.title}" was not approved. Reason: ${reason}`,
      type: "error",
    });

    return article;
  }
};
